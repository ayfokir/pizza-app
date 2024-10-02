'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to retrieve users based on restaurantId
export async function GetUsers(restaurantId) { 
  // Fetch users from the database where restaurantId matches
  try {
    const users = await prisma.user.findMany({
      where: {
        restaurantId:  parseInt(restaurantId), // Filter users by restaurantId
      },
      include: {
        roles: true,          // Include related roles
        orders: true,         // Include related orders
        restaurant: true,     // Include the associated restaurant
        superAdminOf: true,   // Include the restaurant they are a super admin of (if any)
        token: true,          // Include the associated token (if any)
      },
    });

    if (!users || users.length === 0) {
      return {
        message: 'No users found for this restaurant',
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
