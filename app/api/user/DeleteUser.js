"use server";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export async function DeleteUser(userId) {
  console.log("see id:", userId);
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        superAdminOf: true,
      },
    });

    if (!existingUser) {
      return {
        success: false,
        message: `User with ID ${userId} does not exist.`,
      };
    }

    // Use a transaction for atomicity
    await prisma.$transaction(async (tx) => {
      // Use `tx` as the transaction context

      // Step 1: Fetch user roles
      const userRoles = await tx.userRole.findMany({
        where: {
          users: {
            some: {
              id: userId,
            },
          },
        },
      });
      console.log("see user roles", userRoles);
      // Step 2: Disconnect user from roles
      if (userRoles.length > 0) {
        for (const userRole of userRoles) {
          await tx.userRole.update({
            where: { id: userRole.id },
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
        await tx.restaurant.update({
          where: { id: existingUser.superAdminOf.id },
          data: { superAdminId: null },
        });
      }

      // Step 4: Delete orders associated with the user
      const orders = await tx.order.findMany({
        where: { customerId: userId },
      });
      console.log("see orders:", orders);
      // Step 5: Delete junction records in OrderPizza
      if (orders.length > 0) {
        await tx.orderPizza.deleteMany({
          where: { orderId: { in: orders.map((order) => order.id) } },
        });
      } else {
        console.log("No OrderPizza records to delete.");
      }

      // Step 6: Delete the orders
      if (orders.length > 0) {
        await tx.order.deleteMany({
          where: { customerId: userId },
        });
      } else {
        console.log("No orders to delete.");
      }

      // Step 7: Delete tokens associated with the user
      const tokens = await tx.token.findMany({
        where: { userId: userId },
      });
console.log("see tokens:", tokens)
      if (tokens.length > 0) {
        await tx.token.deleteMany({
          where: { userId: userId },
        });
      } else {
        console.log("No tokens to delete.");
      }

      // Step 8: Delete pizzas created by the user
      const pizzas = await tx.pizza.findMany({
        where: { userId: userId },
      });
console.log("see all pizzas:", pizzas)
      if (pizzas.length > 0) {
        await tx.pizza.deleteMany({
          where: { userId: userId },
        });
      } else {
        console.log("No pizzas to delete.");
      }

      // Step 9: Finally, delete the user
      await tx.user.delete({
        where: { id: userId },
      });
    }, {timeout: 8000});

    return {
      message: "User and all related data deleted successfully.",
      success: true,
      userId: userId,
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      error: `${error?.message} || Unexpected error occurred`,
      success: false,
    };
  } finally {
    await prisma.$disconnect();
  }
}
