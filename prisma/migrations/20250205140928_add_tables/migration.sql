/*
  Warnings:

  - You are about to drop the column `area` on the `Consultant` table. All the data in the column will be lost.
  - You are about to drop the column `specialization` on the `Consultant` table. All the data in the column will be lost.
  - You are about to drop the column `area` on the `Mentor` table. All the data in the column will be lost.
  - You are about to drop the column `specialization` on the `Mentor` table. All the data in the column will be lost.
  - You are about to drop the column `consultantId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mentorId` on the `User` table. All the data in the column will be lost.
  - Changed the type of `unit` on the `Price` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PriceUnit" AS ENUM ('HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

-- DropForeignKey
ALTER TABLE "Price" DROP CONSTRAINT "Price_consultantId_fkey";

-- AlterTable
ALTER TABLE "Consultant" DROP COLUMN "area",
DROP COLUMN "specialization",
ADD COLUMN     "bio" TEXT,
ALTER COLUMN "availableSlots" SET DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Mentor" DROP COLUMN "area",
DROP COLUMN "specialization",
ADD COLUMN     "bio" TEXT,
ALTER COLUMN "availableSlots" SET DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Price" ADD COLUMN     "mentorId" TEXT,
ALTER COLUMN "consultantId" DROP NOT NULL,
DROP COLUMN "unit",
ADD COLUMN     "unit" "PriceUnit" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "consultantId",
DROP COLUMN "mentorId";

-- CreateTable
CREATE TABLE "ExpertiseArea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ExpertiseArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MentorExpertise" (
    "mentorId" TEXT NOT NULL,
    "expertiseId" TEXT NOT NULL,

    CONSTRAINT "MentorExpertise_pkey" PRIMARY KEY ("mentorId","expertiseId")
);

-- CreateTable
CREATE TABLE "ConsultantExpertise" (
    "consultantId" TEXT NOT NULL,
    "expertiseId" TEXT NOT NULL,

    CONSTRAINT "ConsultantExpertise_pkey" PRIMARY KEY ("consultantId","expertiseId")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Agendado',
    "link" TEXT,
    "mentorId" TEXT,
    "consultantId" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "meetingLink" TEXT,
    "status" "EventStatus" NOT NULL DEFAULT 'SCHEDULED',
    "createdById" TEXT NOT NULL,
    "locationId" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventParticipant" (
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "EventParticipant_pkey" PRIMARY KEY ("userId","eventId")
);

-- CreateTable
CREATE TABLE "EventLocation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "capacity" INTEGER,

    CONSTRAINT "EventLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserContent" (
    "userId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "watchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserContent_pkey" PRIMARY KEY ("userId","contentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpertiseArea_name_key" ON "ExpertiseArea"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "MentorExpertise" ADD CONSTRAINT "MentorExpertise_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorExpertise" ADD CONSTRAINT "MentorExpertise_expertiseId_fkey" FOREIGN KEY ("expertiseId") REFERENCES "ExpertiseArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultantExpertise" ADD CONSTRAINT "ConsultantExpertise_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "Consultant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultantExpertise" ADD CONSTRAINT "ConsultantExpertise_expertiseId_fkey" FOREIGN KEY ("expertiseId") REFERENCES "ExpertiseArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "Consultant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_consultantId_fkey" FOREIGN KEY ("consultantId") REFERENCES "Consultant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "EventLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipant" ADD CONSTRAINT "EventParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipant" ADD CONSTRAINT "EventParticipant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContent" ADD CONSTRAINT "UserContent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContent" ADD CONSTRAINT "UserContent_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
