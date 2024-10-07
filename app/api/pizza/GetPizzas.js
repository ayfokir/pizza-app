'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to retrieve multiple pizzas
export async function GetPizzas() {
  // Fetch multiple pizzas from the database
  try {
    const pizzas = await prisma.pizza.findMany({
      include: {
        toppings: true, // Include related toppings
        orderPizzas: true, // Include related OrderPizza records
      },
    });

    if (!pizzas || pizzas.length === 0) {
      return {
        message: 'No pizzas found',
        success: false,
      };
    }

    return {
      message: 'Pizzas retrieved successfully',
      success: true,
      pizzas, // Return the retrieved pizzas
    };
  } catch (error) {
   // Handle errors
   return {
    error: error.message || "An unexpected error occurred", // Return the error message
    success: false,
  };
  }
}
