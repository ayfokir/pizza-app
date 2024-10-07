'use server'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const DeleteRole = async (roleId) => {
  console.log("Attempting to delete role with ID:", roleId);
  try {
    // Validate if the role exists
    const existingRole = await prisma.userRole.findUnique({
      where: { id: roleId },
    });

    if (!existingRole) {
      return {
        error: `Role with ID ${roleId} does not exist`,
        status: false,
      };
    }

    // Find all users that have the role
    const usersWithRole = await prisma.user.findMany({
      where: { roles: { some: { id: roleId } } },
    });

    // Disconnect the role from each user
    await Promise.all(usersWithRole.map(user => 
      prisma.user.update({
        where: { id: user.id },
        data: { roles: { disconnect: { id: roleId } } },
      })
    ));

    // Delete the role itself
    const deletedRole = await prisma.userRole.delete({
      where: { id: roleId },
    });

    return {
      message: 'Role deleted successfully',
      status: true,
      roleId: roleId,
    };
  } catch (error) {
    console.error(`Error deleting role with ID ${roleId}: ${error.message}`);
    return {
      error: error.message || 'Failed to delete role',
      status: false,
    };
  } finally {
    await prisma.$disconnect();
  }
};
