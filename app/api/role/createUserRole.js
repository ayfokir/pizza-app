'use server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Define Zod schema for role validation
const roleSchema = z.object({
  name: z.string().min(1, 'Role name is required'),
  permissionIds: z.array(z.number()).nonempty('At least one permission ID is required'),
});

// Create User Role Function
export async function createUserRole(roleName, permissionIds) {
  // Check if roleName is a string
  if (typeof roleName !== 'string' || roleName.trim() === '') {
    return {
      error: 'Role name must be a non-empty string.',
      success: false,
    };
  }

  // Create an object from the role data
  const data = {
    name: roleName.trim(),
    permissionIds: permissionIds, // Assume permissionIds is an array of numbers
  };

  // Validate the data using Zod schema
  try {
    roleSchema.parse(data);
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
  // Save user role to the database
  try {
    const createdUserRole = await prisma.userRole.create({
      data: {
        name: data.name,
        permissions: {
          connect: data.permissionIds.map(id => ({ id })), // Connect existing permissions
        },
      },
    });

    console.log("Created user role:", createdUserRole);

    return {
      message: 'User role created successfully',
      success: true,
      // userRole: createdUserRole, // Return the created user role
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


