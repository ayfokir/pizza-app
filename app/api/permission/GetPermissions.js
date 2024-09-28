'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GetPermissions() {
  // Fetch all permissions from the database
  try {
    const permissions = await prisma.permission.findMany();
    
    return {
      message: 'Permission retrieved successfully',
      success: true,
      permissions, // Return the retrieved permissions
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
