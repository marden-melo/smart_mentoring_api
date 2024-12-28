-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('COMPANY', 'INDIVIDUAL');

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "clientType" "ClientType" NOT NULL,
    "cnpj" TEXT,
    "company_name" TEXT,
    "cpf" TEXT,
    "full_name" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "street" TEXT,
    "district" TEXT,
    "city" TEXT,
    "number" TEXT,
    "state" TEXT,
    "cep" TEXT,
    "responsable" TEXT,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_cnpj_key" ON "clients"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "clients_cpf_key" ON "clients"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");
