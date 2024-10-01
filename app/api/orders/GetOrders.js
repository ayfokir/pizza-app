'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to retrieve multiple order pizzas
export async function GetOrders() {
  // Fetch multiple order pizzas from the database
  try {
    const orderPizzas = await prisma.order.findMany({
      include: {
        customer: true, // Include customer details
        pizzas: {       // Include pizzas in the order
          include: {
            pizza: true,  // Include the pizza details
            toppings: true, // Include the toppings for each pizza
          },
        },
        restaurant: true, // Optionally include restaurant details if necessary
      },
      orderBy: {
        createdAt: 'desc', // Order by createdAt in descending order
      },
    });
    
    if (!orderPizzas || orderPizzas.length === 0) {
      return {
        message: 'No order pizzas found',
        success: false,
      };
    }

    return {
      message: 'Order pizzas retrieved successfully',
      success: true,
      orderPizzas, // Return the retrieved order pizzas
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
