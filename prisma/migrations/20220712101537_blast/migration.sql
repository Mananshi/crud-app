/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameC]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameP]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nameC` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameP` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_name_key";

-- DropIndex
DROP INDEX "Product_name_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "nameC" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "name",
ADD COLUMN     "nameP" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_nameC_key" ON "Category"("nameC");

-- CreateIndex
CREATE UNIQUE INDEX "Product_nameP_key" ON "Product"("nameP");
