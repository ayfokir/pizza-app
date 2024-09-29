'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to retrieve multiple users
export async function GetUsers() {
  // Fetch multiple users from the database
  try {
    const users = await prisma.user.findMany({
      include: {
        roles: true, // Include related roles
        orders: true, // Include related orders
        restaurant: true, // Include the associated restaurant (if any)
        superAdminOf: true, // Include the restaurant they are a super admin of (if any)
        token: true, // Include the associated token (if any)
      },
    });

    if (!users || users.length === 0) {
      return {
        message: 'No users found',
        success: false,
      };
    }

    return {
      message: 'Users retrieved successfully',
      success: true,
      users, // Return the retrieved users
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
