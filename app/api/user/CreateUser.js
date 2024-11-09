'use server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Define Zod schema for validation
const registrationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  restaurantId: z.string().min(1, 'RestaurantId is required'),
  email: z.string().trim().email('Invalid email address').min(1, 'Email is required'),
  phone1: z.string().min(1, 'Phone number is required').regex(/^\d+$/, 'Phone number must contain only digits'),
  phone2: z.string().optional(), // Second phone number is optional
  location: z.string().min(1, 'Location is required'),
  roleIds: z.array(z.number()).nonempty('At least one role ID is required'), // Update to accept an array of role IDs
});

// Function to generate a mock password
const generateMockPassword = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) { // Generate an 8-character password
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
};

// Change the function to accept a JSON object
export async function CreateUser(data) {
  // Validate the data using Zod schema
  console.log("see email address:", data.email)
  try {
    registrationSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("see the error :", error)
      const messages = error.errors.map((err) => err.message).join(', ');
      return {
        error: messages,
        success: false,
      };
    }
    return {
      error: 'An unexpected error occurred',
      success: false,
    };
  }

  // Generate a mock password if not provided
  const password = data.password || generateMockPassword();
  
  // Check if passwords match
  if (data.password && data.password !== data.confirmPassword) {
    return {
      error: 'Passwords do not match',
      success: false,
    };
  }

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    return {
      error: 'Email already registered',
      success: false,
    };
  }

  // Verify that all role IDs exist in the database
  const userRoles = await prisma.userRole.findMany({
    where: {
      id: {
        in: data.roleIds, // Find roles by the provided IDs
      },
    },
  });

  // Check if all provided role IDs are valid
  if (userRoles.length !== data.roleIds.length) {
    return {
      error: 'One or more role IDs are invalid',
      success: false,
    };
  }

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("see the email before trime", data.email)
  console.log("see the email after trime", data.email.trim())
  // Save user and associate with the roles
  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email.trim(),
        restaurantId: data.restaurantId ? parseInt(data.restaurantId): null,
        phoneNumber: data.phone1,
        secondPhoneNumber: data.phone2, // Save second phone number if provided
        password: hashedPassword,
        location: data.location,
        roles: {
          connect: data.roleIds.map((id) => ({ id })), // Connect the user to all specified roles
        },
        // Additional associations like restaurant or others can be added here
      },
    });

    return {
      message: 'Admin registered successfully',
      success: true,
      mockPassword: password, // Optionally return the mock password
    };
  } catch (error) {
    return {
      error: error.message || 'An unexpected error occurred',
      success: false,
    };
  }
}
