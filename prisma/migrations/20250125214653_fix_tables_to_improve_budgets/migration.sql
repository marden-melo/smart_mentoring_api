/*
  Warnings:

  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_budgetId_fkey";

-- AlterTable
ALTER TABLE "budgets" ADD COLUMN     "bonusValue" DOUBLE PRECISION,
ADD COLUMN     "finalValueWithInstallments" DOUBLE PRECISION;

-- DropTable
DROP TABLE "Document";

-- CreateTable
CREATE TABLE "payment_details" (
    "id" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "paymentType" "PaymentType" NOT NULL,
    "installments" INTEGER,
    "fees" DOUBLE PRECISION,
    "observation" TEXT,
    "totalValue" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payment_details" ADD CONSTRAINT "payment_details_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "budgets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
