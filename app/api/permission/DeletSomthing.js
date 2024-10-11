'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DeleteSomthing() {
  try {
    // Delete all restaurants
    const deletedRestaurant = await prisma.restaurant.deleteMany();
    const deletedUser = await prisma.user.deleteMany(); // Changed from delete() to deleteMany()
    // Delete all users

    // console.log("Deleted restaurant count:", deletedRestaurant.count); // Log the count of deleted restaurants
    console.log("Deleted user count:", deletedUser.count); // Log the count of deleted users

    return {
      message: 'Deleted successfully',
      success: true,
    //   deletedRestaurantCount: deletedRestaurant.count,
      deletedUserCount: deletedUser.count,
    };
  } catch (error) {
    console.error("Error during deletion:", error); // Log the error for debugging
    return {
      error: error.message || "An unexpected error occurred",
      success: false,
    };
  }
}
