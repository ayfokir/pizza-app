'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GetToppings(restaurantId) {
  // Fetch all toppings from the database
  try {
    const toppings = await prisma.topping.findMany({
      where: {restaurantId: restaurantId }
    });
    
    return {
      message: 'Toppings retrieved successfully',
      success: true,
      toppings, // Return the retrieved toppings
    };
  } catch (error) {
    // Handle errors
    return {
      error: error.message || "An unexpected error occurred", // Return the error message
      success: false,
    }
  }
}
