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
  password: z.string().min(2, 'Password must be at least 8 characters long'),
});

export async function LoginUser(formData) {
  // Extract data from FormData
  const {email, password}   =  formData
//   const email = formData.get('email')?.toString() ?? '';
//   const password = formData.get('password')?.toString() ?? '';
  const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;
  console.log("see secret:", jwtSecret);

  // Create an object from the form data
  const data = {
    email,
    password,
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
    console.log("see user is theres restaurantID Avalable:", user)
    
    // Compare the password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    
    if (!isPasswordValid) {
      return {
        error: 'Invalid password',
        success: false,
      };
    }
console.log("see all current user information:", user)
// console.log("see all current user roles:", user.roles[0].name)
    // Generate JWT token if needed
    const payload = { // the payload data is not sensitive
      id: user.id,
      name: user.name,
      email: user.email,
      restaurantId: user.restaurantId,
      roles: user.roles.length > 0 ? user.roles.map(role => role.name) : ['guest'], // Assign roles or default to 'guest'
    };
    console.log(jwtSecret);
    const token = jwt.sign(payload, jwtSecret, { expiresIn: '24h' });
    console.log(token);
    console.log("see payload:", payload)
    // Return success if the login is valid
    return {
      message: 'Logged in successfully',
      token, // Include the token in the response if needed
      success: true,
    };

  } catch (error) {
    return {
      error: 'An unexpected error occurred',
      success: false,
    };
  }
}

