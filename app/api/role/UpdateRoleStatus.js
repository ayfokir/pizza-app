"use server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Define Zod schema for validation
const updateStatusSchema = z.object({
  roleId: z.number().int().positive("Role ID must be a positive integer"),
  newStatus: z.enum(["active", "inActive"], { required_error: "Status is required" }), // Status is required and must be either 'active' or 'inactive'
});

// Function to update role status
export async function UpdateUserRoleStatus(data) {
  console.log("see data here insie update role status", data);
  
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

  const { roleId, newStatus } = data;

  // Find the role by ID in the UserRole model
  const userRole = await prisma.userRole.findUnique({
    where: {
      id: roleId,
    },
  });

  if (!userRole) {
    return {
      error: "Role not found",
      success: false,
    };
  }

  console.log("see user role:", userRole);

  // Update the role's status
  try {
    const updatedUserRole = await prisma.userRole.update({
      where: { id: roleId },
      data: {
        status: newStatus !== undefined ? newStatus : (userRole.status === "active" ? "inactive" : "active"),
      },
    });

    return {
      message: `User role status updated successfully`,
      success: true,
      roleId: updatedUserRole.id,
      newStatus: updatedUserRole.status,
    };
  } catch (error) {
    return {
      error:
        error.message ||
        "An unexpected error occurred while updating the role status",
      success: false,
    };
  }
}
