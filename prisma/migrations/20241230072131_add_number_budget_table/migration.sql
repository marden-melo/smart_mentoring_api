/*
  Warnings:

  - A unique constraint covering the columns `[budget_number]` on the table `budgets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `budget_number` to the `budgets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "budgets" ADD COLUMN     "budget_number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "budgets_budget_number_key" ON "budgets"("budget_number");
