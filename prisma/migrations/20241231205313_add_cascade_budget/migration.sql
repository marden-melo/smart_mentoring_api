-- DropForeignKey
ALTER TABLE "budget_items" DROP CONSTRAINT "budget_items_budgetId_fkey";

-- AddForeignKey
ALTER TABLE "budget_items" ADD CONSTRAINT "budget_items_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
