/*
  Warnings:

  - You are about to drop the column `stockQuantity` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Product_stockQuantity_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "stockQuantity";

-- CreateTable
CREATE TABLE "Stocks" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Stocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stocks_productId_key" ON "Stocks"("productId");

-- AddForeignKey
ALTER TABLE "Stocks" ADD CONSTRAINT "Stocks_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
