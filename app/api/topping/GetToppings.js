'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GetToppings() {
  // Fetch all toppings from the database
  try {
    const toppings = await prisma.topping.findMany();
    
    return {
      message: 'Toppings retrieved successfully',
      success: true,
      toppings, // Return the retrieved toppings
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
