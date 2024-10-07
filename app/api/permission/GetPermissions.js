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
    return {
      error: error.message || "An unexpected error occurred", // Return the error message
      success: false,
    };
  }
}
