// app/actions.js
"use server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

// Define Zod schema for validation
const registrationSchema = z.object({
  location: z.string().min(1, "location is required"),
  restaurantId: z.string().min(1, "RestaurantId is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  password: z.string().min(2, "Password must be at least 2 characters long"),
  confirmPassword: z
    .string()
    .min(2, "Confirm Password must be at least 2 characters long"),
});

export async function CreateCustomer(formData) {
  // Extract data from FormData
  const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;

  const location = formData.get("location")?.toString() ?? "";
  const email = formData.get("email")?.toString() ?? "";
  const restaurantId = formData.get("restaurantId").toString() ?? "";
  const phone = formData.get("phone")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";
  console.log("see email here:", email);
  console.log("see the restaurant:", restaurantId);
  // Create an object from the form data
  const data = {
    location,
    restaurantId,
    email,
    phone,
    password,
    confirmPassword,
  };

  console.log("see all Data:", data);
  // Validate the data using Zod schema
  try {
    registrationSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("see error:", error);
      // Handle validation errors
      const messages = error.errors.map((err) => err.message).join(", ");
      return {
        error: messages,
        success: false,
      };
    }
    // Handle other types of errors
    return {
      error: "An unexpected error occurred",
      success: false,
    };
  }

  // Check if passwords match
  if (data.password !== data.confirmPassword) {
    return {
      error: "Passwords do not match",
      success: false,
    };
  }

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  console.log("see existingUser:", existingUser);

  if (existingUser) {
    return {
      error: "Email already registered",
      success: false,
    };
  }

  // Generate a salt and hash password
  const salt = await bcrypt.genSalt(10);
  console.log("see the salt:", salt);

  // Hash the password
  const hashedPassword = await bcrypt.hash(data.password, salt);

  // Save user and restaurant to the database
  try {
    const user = await prisma.user.create({
      data: {
        location: data.location,
        restaurantId: parseInt(restaurantId),
        email: data.email,
        phoneNumber: data.phone,
        isActive: true,
        password: hashedPassword,
        // Here you can set the restaurantId later after creating the restaurant
      },
    });

    // Generate JWT token if needed
    const payload = {
      // the payload data is not sensitive
      id: user.id,
      name: user.name,
      email: user.email,
      restaurantId: user.restaurantId,
      roles: ['guest'], // Assign roles or default to 'guest'
    };
    console.log(jwtSecret);
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "24h" });
    console.log(token);

    return {
      message: "Customer registered successfully",
      token, // Include the token in the response if needed
      success: true,
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
      error: "An unexpected error occurred",
      success: false,
    };
  }
}
