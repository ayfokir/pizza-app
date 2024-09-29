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
    pizzaId: z.string().regex(/^\d+$/, 'Pizza ID must be a valid string number'), // String number for pizza ID
    toppings: z.array(z.string()), // Optional array of strings for toppings
    quantity: z.string().regex(/^\d+$/, 'Quantity must be a valid string number'),
  });
  

// Create Order Function
export async function createOrder(data) {
  // Validate the data using Zod schema
  try {
    orderSchema.parse(data);
  } catch (error) {
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
  const { status, customerId, restaurantId, pizzas, quantity } = data;

  // Save order to the database
  try {
    const createdOrder = await prisma.$transaction(async (tx) => {
      // Step 1: Create the Order
      const order = await tx.order.create({
        data: {
          status,
          customerId,
          restaurantId,
          quantity,
        },
      });

      // Step 2: Create OrderPizza entries
      const orderPizzaPromises = pizzas.map((pizza) =>
        tx.orderPizza.create({
          data: {
            pizzaId: pizza.pizzaId,
            orderId: order.id, // Link the orderId
            toppings: {
              connect: pizza.toppingIds?.map((id) => ({ id })) || [], // Connect toppings if any
            },
          },
        })
      );

      // Wait for all OrderPizza records to be created
      await Promise.all(orderPizzaPromises);

      return order;
    });

    console.log('Created order:', createdOrder);

    return {
      message: 'Order created successfully',
      success: true,
      // order: createdOrder, // Optionally return the created order
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
