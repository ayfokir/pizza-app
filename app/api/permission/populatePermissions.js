'use server'

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function populatePermissions() {
  // Define the permissions you want to add
  const permissions = [
    { name: 'update order status' },
    { name: 'see orders' },
    { name: 'add users' },
    { name: 'see customers' },
    { name: 'create roles' },
    { name: 'create pizza' },
  ];

  for (const permission of permissions) {
    // Trim and normalize the name for consistent comparison
    const normalizedName = permission.name.trim().toLowerCase();

    // Check if the permission already exists
    const existingPermission = await prisma.permission.findFirst({
      where: {
        name: {
          equals: normalizedName,
          mode: 'insensitive', // Case-insensitive search (PostgreSQL)
        },
      },
    });

    // Only add if it doesn't already exist
    if (!existingPermission) {
      await prisma.permission.create({
        data: { name: normalizedName }, // Store the normalized name
      });
      console.log(`Added permission: ${permission.name}`);
    } else {
      console.log(`Permission '${permission.name}' already exists, skipping.`);
    }
  }
}

populatePermissions()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
