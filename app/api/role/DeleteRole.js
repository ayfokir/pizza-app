'use server'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const DeleteRole = async (roleId) => {
  console.log("see id server side:", roleId);
  try {
    // Validate if the role exists
    const existingRole = await prisma.userRole.findUnique({
      where: { id: roleId },
    });

    if (!existingRole) {
      return {
        success: false,
        message: `Role with id ${roleId} does not exist`,
      };
    }

    // Find all users that have the role
    const usersWithRole = await prisma.user.findMany({
      where: { roles: { some: { id: roleId } } },
    });

    // Disconnect the role from each user individually
    for (const user of usersWithRole) {
      await prisma.user.update({
        where: { id: user.id },
        data: { roles: { disconnect: { id: roleId } } },
      });
    }

    // Then delete the role itself
    const deletedRole = await prisma.userRole.delete({
      where: { id: roleId },
    });

    return {
      success: true,
      message: 'Role deleted successfully',
      data: deletedRole,
    };
  } catch (error) {
    console.error(`Error deleting role: ${error.message}`);
    return {
      success: false,
      message: 'Failed to delete role',
      error: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
};
