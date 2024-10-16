"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to retrieve multiple order pizzas
export async function GetOrders(restaurantId) {
  // Fetch multiple order pizzas from the database
  console.log("see id:", restaurantId)
  try {
    const orderPizzas = await prisma.order.findMany({
      where: { restaurantId: parseInt(restaurantId) },
      include: {
        customer: true, // Include customer details
        pizzas: {
          // Include pizzas in the order
          include: {
            pizza: true, // Include the pizza details
            toppings: true, // Include the toppings for each pizza
          },
        },
        restaurant: true, // Optionally include restaurant details if necessary
      },
      orderBy: {
        createdAt: "desc", // Order by createdAt in descending order
      },
    });

    if (!orderPizzas || orderPizzas.length === 0) {
      return {
        message: "No order pizzas found",
        success: false,
      };
    }

    return {
      message: "Order pizzas retrieved successfully",
      success: true,
      orderPizzas, // Return the retrieved order pizzas
    };
  } catch (error) {
    // Handle errors
    return {
      error: error.message || "An unexpected error occurred", // Return the error message
      success: false,
    };
  }
}
