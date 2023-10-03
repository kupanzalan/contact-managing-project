/*
  Warnings:

  - The primary key for the `Contact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_pkey",
DROP COLUMN "id",
DROP COLUMN "imageUrl",
ADD COLUMN     "contactId" SERIAL NOT NULL,
ADD COLUMN     "picture" TEXT,
ADD CONSTRAINT "Contact_pkey" PRIMARY KEY ("contactId");
