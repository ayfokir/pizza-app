"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Function to retrieve multiple order pizzas
export async function GetOrders(restaurantId, filterCriteria) {
  let status, pizzaName, createdAt;
  if (filterCriteria) {
    ({ status, pizzaName, createdAt } = filterCriteria);
  }
  console.log("see status:", status)
  console.log("see restaurantId:", restaurantId)
  try {
    // Build the filters conditionally
    let filters = {
      restaurantId: parseInt(restaurantId), // Ensure the restaurantId filter is always applied
    };

    // If the status filter is provided, add it to the query
    if (status) {
      filters.status = status;
    }

    // If the pizza name filter is provided, add it to the query
    if (pizzaName) {
      filters.pizzas = {
        some: {
          pizza: {
            name: {
              contains: pizzaName, // Use 'contains' for partial matching
              mode: "insensitive", // Case-insensitive search
            },
          },
        },
      };
    }

    // If createdAt filter is provided, apply the filter
    if (createdAt) {
      filters.createdAt = {
        gte: new Date(createdAt), // Assuming you're filtering from a specific date
      };
    }
console.log("here all filtering criteria", filters)
    // Fetch the order pizzas from the database
    const orderPizzas = await prisma.order.findMany({
      where: filters,
      include: {
        customer: true, // Include customer details
        pizzas: {
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
console.log("see  orderPizzas", orderPizzas)
    // Handle the case where no orders are found
    if (!orderPizzas || orderPizzas.length === 0) {
      return {
        message: "No order pizzas found",
        success: false,
      };
    }

    // Return the retrieved order pizzas
    return {
      message: "Order pizzas retrieved successfully",
      success: true,
      orderPizzas,
    };
  } catch (error) {
    // Handle errors
    return {
      error: error.message || "An unexpected error occurred",
      success: false,
    };
  }
}
