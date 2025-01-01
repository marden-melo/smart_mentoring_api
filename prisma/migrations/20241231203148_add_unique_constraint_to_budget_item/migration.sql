/*
  Warnings:

  - A unique constraint covering the columns `[productId,budgetId]` on the table `budget_items` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "budget_items_productId_budgetId_key" ON "budget_items"("productId", "budgetId");
