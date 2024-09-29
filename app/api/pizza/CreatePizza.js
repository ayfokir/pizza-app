// app/actions.js
'use server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { UploadImage } from '../register/UploadImage'; // Adjust the path for your image upload function

const prisma = new PrismaClient();

// Custom validation function to check file type
const isValidFile = (file) => {
  if (!file) return false;
  const validTypes = ['image/jpeg', 'image/png', 'image/gif']; // Add other valid types as needed
  return validTypes.includes(file.type);
};

// Define Zod schema for pizza validation
const pizzaSchema = z.object({
  name: z.string().min(1, 'Pizza name is required'),
  price: z.number().positive('Price must be a positive number'),
  toppings: z.array(z.string()).min(1, 'At least one topping is required'),
  pizzaPhoto: z.instanceof(File).refine(isValidFile, 'Pizza photo must be a valid image file (jpeg, png, gif)'),
});

export async function CreatePizza(formData) {
  // Extract data from FormData
  const name = formData.get('name')?.toString() ?? '';
  const price = parseFloat(formData.get('price')?.toString() ?? '0');

  // Parse the toppings to ensure it's an array of strings (IDs)
  let toppings;
  try {
    const toppingsRaw = formData.get('toppings');
    toppings = JSON.parse(toppingsRaw); // Parse the stringified array of topping IDs
  } catch (e) {
    // Handle case where toppings might be a single ID or already an array
    toppings = formData.getAll('toppings').map(t => t.toString());
  }

  const pizzaPhoto = formData.get('pizza_photo'); // This will be a File object

  // Create an object from the form data
  const data = {
    name,
    price,
    toppings,
    pizzaPhoto, // Include the pizza photo in the data object
  };

  console.log("see pizza data:", data);

  // Validate the data using Zod schema
  try {
    pizzaSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
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

  // console.log("see the pizza Url above :", pizzaPhotoUrl)
  // Handle pizza photo file upload and get the URL
  let pizzaPhotoUrl;
  if (pizzaPhoto) {
    pizzaPhotoUrl = await UploadImage(pizzaPhoto); // Implement your upload function to get the URL
    pizzaPhotoUrl = `/${pizzaPhotoUrl.uniqueFileName}`;
  }
console.log("see the pizza Url below:", pizzaPhotoUrl)
  // Save pizza and its toppings to the database
  try {
    // Create pizza record and associate toppings using IDs from the frontend
    const pizza = await prisma.pizza.create({
      data: {
        name: data.name,
        price: data.price,
        pizza_photo: pizzaPhotoUrl, // Set the pizza photo URL
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
    // Handle errors
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
