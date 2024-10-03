// app/actions.js
'use server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { UploadImage } from '../register/UploadImage'; // Adjust the path for your image upload function

const prisma = new PrismaClient();

// Define the pizza schema
const pizzaSchema = z.object({
  name: z.string().min(1, 'Pizza name is required'),
  price: z.number().min(0.01, 'Price must be at least $0.01'),
  pizza_photo: z.instanceof(File).optional().refine(file => file !== null, {
    message: 'Pizza photo is required',
  }), // Check if pizza_photo is a File instance
  restaurantId: z.string().min(1, 'Restaurant ID is required'),
  userId: z.string().min(1, 'User ID is required'),
  toppings: z.array(z.string()).optional(), // Array of strings for topping IDs
});

export async function CreatePizza(formData) {
  // Extract data from FormData
  const name = formData.get('name')?.toString() ?? '';
  const price = parseFloat(formData.get('price')?.toString() ?? '0');
  const restaurantId = formData.get('restaurantId')?.toString() ?? ''; // Get restaurantId as string
  const userId = formData.get('userId')?.toString() ?? ''; // Get userId from formData

  console.log("see user Id:", userId);
  console.log("see restaurant Id:", restaurantId);
  console.log("see price:", price);
  console.log("see pizza name:", name);

  // Parse the toppings to ensure it's an array of strings (IDs)
  let toppings;
  try {
    const toppingsRaw = formData.get('toppings');
    toppings = JSON.parse(toppingsRaw); // Parse the stringified array of topping IDs
  } catch (e) {
    toppings = formData.getAll('toppings').map(t => t.toString());
  }

  const pizzaPhoto = formData.get('pizza_photo'); // This will be a File object

  // Create an object from the form data
  const data = {
    name,
    price,
    toppings,
    pizzaPhoto, // Include the pizza photo in the data object
    restaurantId, // Include restaurantId
    userId, // Include userId
  };

  console.log("Pizza data to be created:", {
    name: data.name,
    price: data.price,
    pizza_photo: pizzaPhoto,
    restaurantId: parseInt(restaurantId, 10),
    userId: parseInt(userId, 10),
    toppings: data.toppings.map(t => parseInt(t, 10)), // Ensure toppings are integers
  });

  // Validate the data using Zod schema
  try {
    pizzaSchema.parse(data);
  } catch (error) {
    console.error("Error while creating pizza:", error); // Log the error for debugging
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(err => err.message).join(', ');
      return {
        error: messages,
        success: false,
      };
    }
    return {
      error: 'An unexpected error occurred',
      success: false,
    };
  }

  // Handle pizza photo file upload and get the URL
  let pizzaPhotoUrl;
  if (pizzaPhoto) {
    pizzaPhotoUrl = await UploadImage(pizzaPhoto);
    pizzaPhotoUrl = `/${pizzaPhotoUrl.uniqueFileName}`;
  }

  // Save pizza and its toppings to the database
  try {
    // Create pizza record and associate toppings using IDs from the frontend
    const pizza = await prisma.pizza.create({
      data: {
        name: data.name,
        price: data.price,
        pizza_photo: pizzaPhotoUrl,
        restaurant: {
          connect: { id: parseInt(restaurantId, 10) }, // Connect to the restaurant by ID
        },
        user: {
          connect: { id: parseInt(userId, 10) }, // Associate the pizza with the existing user
        },
        toppings: {
          connect: data.toppings.map((toppingId) => ({ id: parseInt(toppingId, 10) })), // Connect using topping IDs
        },
      },
    });

    return {
      message: 'Pizza registered successfully',
      success: true,
    };
  } catch (error) {
    console.error("Error while creating pizza:", error); // Log the error for debugging
    if (error instanceof Error) {
      return {
        error: error.message,
        success: false,
      };
    }
    return {
      error: 'An unexpected error occurred',
      success: false,
    };
  }
}
