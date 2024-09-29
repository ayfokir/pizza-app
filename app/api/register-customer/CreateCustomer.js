// app/actions.js
'use server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();


// Define Zod schema for validation
const registrationSchema = z.object({
  location: z.string().min(1, 'location is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone number is required').regex(/^\d+$/, 'Phone number must contain only digits'),
  password: z.string().min(2, 'Password must be at least 2 characters long'),
  confirmPassword: z.string().min(2, 'Confirm Password must be at least 2 characters long'),
});

export async function CreateCustomer(formData) {
  // Extract data from FormData
  const location = formData.get('location')?.toString() ?? '';
  const email = formData.get('email')?.toString() ?? '';
  const phone = formData.get('phone')?.toString() ?? '';
  const password = formData.get('password')?.toString() ?? '';
  const confirmPassword = formData.get('confirmPassword')?.toString() ?? '';
  console.log("see email here:", email)

  // Create an object from the form data
  const data = {
    location,
    email,
    phone,
    password,
    confirmPassword,
  };

  console.log("see all Data:", data)
  // Validate the data using Zod schema
  try {
    registrationSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("see error:", error)
      // Handle validation errors
      const messages = error.errors.map(err => err.message).join(', ');
      return {
        error: messages,
        success: false,
      };
    }
    // Handle other types of errors
    return {
      error: 'An unexpected error occurred',
      success: false,
    };
  }

  // Check if passwords match
  if (data.password !== data.confirmPassword) {
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

console.log("see existingUser:", existingUser)

  if (existingUser) {
    return {
      error: 'Email already registered',
      success: false,
    };
  }

  // Generate a salt and hash password
  const salt = await bcrypt.genSalt(10);
  console.log("see the salt:", salt);

  // Hash the password
  const hashedPassword = await bcrypt.hash(data.password, salt);

  // Save user and restaurant to the database
  try {
    const user = await prisma.user.create({
    data: {
        location: data.location,
        email: data.email,
        phoneNumber: data.phone,
        password: hashedPassword,
        // Here you can set the restaurantId later after creating the restaurant
      },
    });

  
       // Fetch the latest restaurant (you can adjust the criteria to match your needs)
  const restaurant = await prisma.restaurant.findFirst({
    orderBy: {
      createdAt: 'desc', // Assuming `createdAt` is a timestamp for when the restaurant was created
    },
  });

  if (!restaurant) {
    return {
      error: 'No restaurant found',
      success: false,
    };
  }
    // Update the user with the restaurant ID
    await prisma.user.update({
      where: { id: user.id },
      data: { restaurantId: restaurant.id },
    });

    return {
      message: 'Customer registered successfully',
      success: true,
    };
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      return {
        error: error.message, // Return the error message
        success: false,
      };
    }
    // Handle other types of errors
    return {
      error: 'An unexpected error occurred',
      success: false,
    };
  }
}
