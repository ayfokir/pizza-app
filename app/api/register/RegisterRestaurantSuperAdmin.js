// app/actions.js
'use server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Define Zod schema for validation
const registrationSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(2, 'Password must be at least 8 characters long'),
  confirmPassword: z.string().min(2, 'Confirm Password must be at least 8 characters long'),
  location: z.string().min(1, 'Location is required '),
  phone: z.string().min(1, 'Phone number is required')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
});

export async function RegisterRestaurantSuperAdmin(formData) {
  // Extract data from FormData
  const email = formData.get('email')?.toString() ?? '';
  const password = formData.get('password')?.toString() ?? '';
  const confirmPassword = formData.get('confirmPassword')?.toString() ?? '';
  const location = formData.get('location')?.toString() ?? '';
  const phone = formData.get('phone')?.toString() ?? '';

  console.log("see user data:", email);

  // Create an object from the form data
  const data = {
    email,
    password,
    confirmPassword,
    location,
    phone,
  };

  // Validate the data using Zod schema
  try {
    registrationSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
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
      success: false
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
      success: false
    };
  }

  // Generate a salt and hash password
  const salt = await bcrypt.genSalt(10);
  console.log("see the salt:", salt);

  // Hash the password
  const hashedPassword = await bcrypt.hash(data.password, salt);

  // Save user to the database
  try {
    await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: 'renter', // Adjust as needed
        phone_number: data.phone,
        location: data.location,
      },
    });
    return {
      message: 'User registered successfully',
      success: true
    };
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      return {
        error: error.message, // Return the error message
        success: false
      };
    }
    // Handle other types of errors
    return {
      error: 'An unexpected error occurred',
      success: false
    };
  }
}
