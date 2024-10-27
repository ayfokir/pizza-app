/*
  Warnings:

  - Made the column `restaurantId` on table `UserRole` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_restaurantId_fkey";

-- AlterTable
ALTER TABLE "UserRole" ALTER COLUMN "restaurantId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
