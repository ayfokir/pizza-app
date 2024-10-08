-- CreateEnum
CREATE TYPE "RoleStatus" AS ENUM ('active', 'inActive');

-- AlterTable
ALTER TABLE "UserRole" ADD COLUMN     "status" "RoleStatus" NOT NULL DEFAULT 'active';
