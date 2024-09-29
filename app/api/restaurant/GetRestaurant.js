'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to retrieve multiple restaurants
export async function GetRestaurants() {
  // Fetch multiple restaurants from the database
  try {
    const restaurants = await prisma.restaurant.findMany({
      include: {
        users: true,  // Include related users
        orders: true,  // Include related orders
        superAdmin: true,  // Include the associated super admin
      },
    });

    if (!restaurants || restaurants.length === 0) {
      return {
        message: 'No restaurants found',
        success: false,
      };
    }

    return {
      message: 'Restaurants retrieved successfully',
      success: true,
      restaurants, // Return the retrieved restaurants
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
