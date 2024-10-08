"use server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Define Zod schema for validation
const updateStatusSchema = z.object({
    userId: z.number().int().positive("User ID must be a positive integer"),
    newStatus: z.enum(["active", "inActive"], { required_error: "Status is required" }), // Status is required and must be either 'active' or 'inactive'
  });
  

// Function to update user status
export async function UpdateUserStatus(data) {
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

  const { userId, newStatus } = data;

  // Find the user by ID
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
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
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        status: newStatus !== undefined ? newStatus : (user.status === "active" ? "inactive" : "active"),
    },
    });

    return {
      message: `User status updated successfully`,
      success: true,
      userId: updatedUser.id,
      newStatus: updatedUser.status,
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
