// app/actions.js
'use server';
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { z } = require('zod');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// Define Zod schema for validation
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(2, 'Password must be at least 2 characters long'),
});

export async function ChangePassword(formData) {
  // Extract data from FormData
  const {email, password}   =  formData
  const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;
  
  console.log("see secret:", jwtSecret);

  // Create an object from the form data
  const data = {
    email,
    password, // Include the new password in validation
  };

  console.log("see data ", data);

  // Validate the data using Zod schema
  try {
    loginSchema.parse(data);
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

  // Check if the user exists
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
      include: {
        roles: true,
      }
    });

    console.log("see user:", user);

    if (!user) {
      return {
        error: 'User not found',
        success: false,
      };
    }
console.log("see user:", user)
    const salt = await bcrypt.genSalt(10);
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password in the database
    await prisma.user.update({
      where: { email: data.email },
      data: { password: hashedPassword },
    });

    //// Create JWT token if needed (optional)
    // const token = jwt.sign({ userId: user.id, roles: user.roles }, jwtSecret, {
    //   expiresIn: '1h', // Token expiration time
    // });

    // Return success if the login is valid
    return {
      message: 'Password changed successfully',
    //   token, // Include the token in the response if needed
      success: true,
    };

  } catch (error) {
    console.error(error);
    return {
      error: 'An unexpected error occurred',
      success: false,
    };
  }
}
