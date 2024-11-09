"use server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Define Zod schema for validation
const updateStatusSchema = z.object({
    restaurantId: z.number().int().positive("User ID must be a positive integer"),
    name: z.string().min(2, "name is required" ), // Status is required and must be either 'active' or 'inactive'
  });
  

// Function to update user status
export async function UpdateUserRestaurant(data) {
    console.log("see data here", data)
  // Validate the data using Zod schema
  try {
    updateStatusSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map((err) => err.message).join(", ");
      return {
        error: messages,
        success: false,
      };
    }
    return {
      error: "An unexpected error occurred",
      success: false,
    };
  }

  const { restaurantId, name } = data;

  // Find the user by ID
  const user = await prisma.restaurant.findUnique({
    where: {
      id: restaurantId,
    },
  });

  if (!user) {
    return {
      error: "User not found",
      success: false,
    };
  }
console.log("see users:", user)
  // Update the user's status
  try {
    const updatedRestaurangt = await prisma.restaurant.update({
      where: { id: restaurantId },
      data: {
        name: name 
    },
    });

    return {
      message: `User status updated successfully`,
      success: true,
      restaurantId: updatedRestaurangt.id,
      name: updatedRestaurangt.name,
    };
  } catch (error) {
    return {
      error:
        error.message ||
        "An unexpected error occurred while updating the user status",
      success: false,
    };
  }
}
