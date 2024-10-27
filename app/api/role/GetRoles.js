'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GetRoles(restaurantId) {
  // Fetch all user roles from the database
  try {
    const userRoles = await prisma.userRole.findMany({
      where: {restaurantId: restaurantId},
      include: {
        permissions: true
      }
    });  // Query the user roles table
    // console.log("see user Roles:", userRoles)
    return {
      message: 'User roles retrieved successfully',
      success: true,
      userRoles, // Return the retrieved user roles
    };
  } catch (error) {
    // Handle errors
      return {
        error: error.message || "An unexpected error occurred", // Return the error message
        success: false,
      };
  }
}
