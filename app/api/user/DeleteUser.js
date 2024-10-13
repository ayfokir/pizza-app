'use server'

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export async function DeleteUser(userId) {
  console.log("see id:", userId)
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        superAdminOf: true, // Include the restaurant for super admin check
      },
    });

    if (!existingUser) {
      // throw new Error(`User with ID ${userId} does not exist.`);
      return {
        success: false,
        message: `User with ID ${userId} does not exist.`,
      };
    }

    // Use a transaction for atomicity
    await prisma.$transaction(async (prisma) => {
      // Step 1: Fetch user roles
      const userRoles = await prisma.userRole.findMany({
        where: {
          users: {
            some: {
              id: userId,
            },
          },
        },
      });

      // Check if user has roles
      if (userRoles.length === 0) {
        console.log(`User with ID ${userId} has no associated roles.`);
      } else {
        // Step 2: Disconnect the user from roles
        for (const userRole of userRoles) {
          await prisma.userRole.update({
            where: { id: userRole.id }, // Assuming userRole.id is the unique identifier for the role connection
            data: {
              users: {
                disconnect: { id: userId },
              },
            },
          });
        }
      }

      // Step 3: Handle the case where the user is a super admin of a restaurant
      if (existingUser.superAdminOf) {
        await prisma.restaurant.update({
          where: { id: existingUser.superAdminOf.id },
          data: { superAdminId: null },
        });
      }

      // Step 4: Delete orders associated with the user
      const orders = await prisma.order.findMany({
        where: { customerId: userId },
      });

      // Step 5: Delete junction records in OrderPizza
      await prisma.orderPizza.deleteMany({
        where: { orderId: { in: orders.map(order => order.id) } },
      });

      // Step 6: Delete the orders
      await prisma.order.deleteMany({
        where: { customerId: userId },
      });

      // Step 7: Delete tokens associated with the user
      await prisma.token.deleteMany({
        where: { userId: userId },
      });

      // Step 8: Delete pizzas created by the user
      await prisma.pizza.deleteMany({
        where: { userId: userId },
      });

      // Step 9: Finally, delete the user
      await prisma.user.delete({
        where: { id: userId },
      });
    });
    return {
      message: 'User and all related data deleted successfully.',
      success: true,
      userId: userId, // Optionally return the mock password
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      error: `${error?.message} || Un expected error occured`,
      success: false,
      // userId: userId, // Optionally return the mock password
    };
    // throw error;
  } finally {
    await prisma.$disconnect();
  }
}

