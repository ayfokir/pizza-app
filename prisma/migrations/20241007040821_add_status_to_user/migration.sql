-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'inActive');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'active';
