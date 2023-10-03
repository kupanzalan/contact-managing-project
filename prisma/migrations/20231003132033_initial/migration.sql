/*
  Warnings:

  - You are about to drop the column `pictureName` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "pictureName",
ADD COLUMN     "imageUrl" TEXT;
