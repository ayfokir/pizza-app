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
    // Check if the permission already exists
    const existingPermission = await prisma.permission.findFirst({
      where: { name: permission.name },
    });

    // Only add if it doesn't already exist
    if (!existingPermission) {
      await prisma.permission.create({
        data: permission,
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
