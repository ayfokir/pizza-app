'use server'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteUser = async (userId) => {
  try {
    // Validate if the user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return {
        success: false,
        message: `User with id ${userId} does not exist`,
      };
    }

    // Log the existing user before deletion
    console.log("Existing user found:", existingUser);

    // Delete the user's token (if it exists)
    await prisma.token.deleteMany({
      where: { userId },
    });

    // Get the orders associated with the user
    const orders = await prisma.order.findMany({
      where: { customerId: userId },
    });

    // Delete associated OrderPizza records for each order
    for (const order of orders) {
      await prisma.orderPizza.deleteMany({
        where: { orderId: order.id },
      });
    }

    // Now delete the orders associated with the user
    await prisma.order.deleteMany({
      where: { customerId: userId },
    });

    // Then delete the user itself
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    return {
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    };
  } catch (error) {
    console.error(`Error deleting user: ${error.message}`);
    return {
      success: false,
      message: 'Failed to delete user',
      error: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
};
