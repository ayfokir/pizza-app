'use server';
const { PrismaClient, OrderStatus } = require('@prisma/client');
const { z } = require('zod');

const prisma = new PrismaClient();

// Define Zod schema for order newStatus validation
const updateOrderStatusSchema = z.object({
  orderId: z.number().positive('Order ID must be a positive number'),
  newStatus: z.nativeEnum(OrderStatus, 'Invalid order newStatus'),
});

// Update Order Status Function
export async function updateOrderStatus({orderId, newStatus}) {
  // Create data object to validate
console.log("see order newStatus:", OrderStatus)
console.log("see the id ", orderId)
console.log("see the newStatus ", newStatus)

  const data = {
    orderId,
    newStatus,
  };

  // Validate the data using Zod schema
  try {
    updateOrderStatusSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      const messages = error.errors.map(err => err.message).join(', ');
      return {
        error: messages,
        success: false,
      };
    }
    // Handle unexpected validation errors
    return {
      error: 'An unexpected validation error occurred',
      success: false,
    };
  }

  // Update order newStatus in the database
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: data.orderId,
      },
      data: {
        status: data.newStatus,
        updatedAt: new Date(), // Update the timestamp
      },
    });

    if (!updatedOrder) {
      return {
        message: 'Order not found',
        success: false,
      };
    }

    return {
      message: 'Order newStatus updated successfully',
      success: true,
      updatedOrder,
    };
  } catch (error) {
    // Handle database errors
    if (error instanceof Error) {
      return {
        error: error.message,
        success: false,
      };
    }
    // Handle other types of errors
    return {
      error: 'An unexpected error occurred',
      success: false,
    };
  }
}

