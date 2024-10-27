-- AlterTable
ALTER TABLE "UserRole" ADD COLUMN     "restaurantId" INTEGER;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
