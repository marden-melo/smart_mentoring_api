/*
  Warnings:

  - Added the required column `quantity` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('PRODUCT', 'SERVICE');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "type" "ProductType" NOT NULL DEFAULT 'PRODUCT';
