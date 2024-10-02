'use server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Define Zod schema for topping validation
const toppingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  restaurantId: z.number().int().positive('Invalid restaurant ID'), // Validation for restaurantId
});

export async function CreateTopping(topping, restaurantId) {
  // Validate input types
  if (typeof topping !== 'string' || topping.trim() === '') {
    return {
      error: 'Topping name must be a non-empty string.',
      success: false,
    };
  }

  // Create an object from the topping data
  const data = {
    name: topping.trim(),
    restaurantId: restaurantId, // Ensure the restaurantId is passed and validated
  };

  // Validate the data using Zod schema
  try {
    toppingSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      const messages = error.errors.map(err => err.message).join(', ');
      return {
        error: messages,
        success: false,
      };
    }
    // Handle other types of errors
    return {
      error: 'An unexpected error occurred',
      success: false,
    };
  }

  // Save topping to the database
  try {
    const createdTopping = await prisma.topping.create({
      data: {
        name: data.name, // Use validated name
        restaurantId: data.restaurantId, // Ensure restaurantId is saved with topping
      },
    });

    console.log("Topping created:", createdTopping);

    return {
      message: 'Topping created successfully',
      success: true,
      topping: createdTopping, // Return the created topping
    };
  } catch (error) {
    // Handle errors
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
