'use server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Define Zod schema for order validation
const orderSchema = z.object({
  status: z.enum(['Prepairing', 'Ready', 'Delivered'], {
    errorMap: () => ({ message: 'Invalid order status' }),
  }),
  customerId: z.string().regex(/^\d+$/, 'Customer ID must be a valid string number'),
  restaurantId: z.string().regex(/^\d+$/, 'Restaurant ID must be a valid string number').optional(),
  pizzaId: z.string().regex(/^\d+$/, 'Pizza ID must be a valid string number'), // Single pizza ID
  toppings: z.array(z.number()), // Change toppings to an array of numbers
  quantity: z.string().regex(/^\d+$/, 'Quantity must be a valid string number'),
});

// Create Order Function
export async function createOrder(data) {
  console.log("see pizza order information here here:", data)
  // Validate the data using Zod schema
  try {
    orderSchema.parse(data);
  } catch (error) {
    console.log("see the error:", error)
    if (error instanceof z.ZodError) {
      // Handle validation errors
      const messages = error.errors.map((err) => err.message).join(', ');
      return {
        error: messages,
        success: false,
      };
    }
    // Handle other types of errors
    return {
      error: 'An unexpected error occurred during validation',
      success: false,
    };
  }

  // Destructure the validated data
  const { status, customerId, restaurantId, pizzaId, toppings, quantity } = data;

  console.log("see data:", data);
  console.log("see type of pizza id:", typeof(pizzaId));
  console.log("see type of pizza id:", typeof(toppings[0]));

  // Save order to the database
  try {
    const createdOrder = await prisma.$transaction(async (tx) => {
      // Step 1: Create the Order
      const order = await tx.order.create({
        data: {
          status,
          customerId: parseInt(customerId), // Make sure customerId is an integer
          restaurantId: restaurantId ? parseInt(restaurantId) : null, // Parse restaurantId if present
          quantity: parseInt(quantity), // Parse quantity as an integer
        },
      });

      // Step 2: Create one OrderPizza entry since we have only one pizza
      const createdOrderPizza = await tx.orderPizza.create({
        data: {
          pizzaId: parseInt(pizzaId), // Ensure pizzaId is an integer
          orderId: order.id, // Link the orderId to the created order
          toppings: {
            connect: toppings.map((id) => ({ id })) || [], // Connect toppings using number ids
          },
        },
      });

      return { order, createdOrderPizza };
    });

    console.log('Created order:', createdOrder);

    return {
      message: 'Order created successfully',
      success: true,
    };
  } catch (error) {
    // Handle database errors
    if (error instanceof Error) {
      return {
        error: error.message, // Return the error message
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
