'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GetUserRoles() {
  // Fetch all user roles from the database
  try {
    const userRoles = await prisma.userRole.findMany();  // Query the user roles table
    
    return {
      message: 'User roles retrieved successfully',
      success: true,
      userRoles, // Return the retrieved user roles
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
