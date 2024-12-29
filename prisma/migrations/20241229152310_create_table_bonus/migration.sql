-- AlterTable
ALTER TABLE "budgets" ADD COLUMN     "bonusId" TEXT;

-- CreateTable
CREATE TABLE "bonuses" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION,
    "value" DOUBLE PRECISION,

    CONSTRAINT "bonuses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "budgets" ADD CONSTRAINT "budgets_bonusId_fkey" FOREIGN KEY ("bonusId") REFERENCES "bonuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
