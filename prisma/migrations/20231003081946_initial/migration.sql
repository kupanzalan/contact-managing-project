/*
  Warnings:

  - You are about to drop the column `pictureId` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the `Picture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_pictureId_fkey";

-- DropIndex
DROP INDEX "Contact_id_key";

-- DropIndex
DROP INDEX "Contact_pictureId_key";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "pictureId",
ADD COLUMN     "pictureName" TEXT;

-- DropTable
DROP TABLE "Picture";
