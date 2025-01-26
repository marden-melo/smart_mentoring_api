/*
  Warnings:

  - You are about to drop the column `created_at` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `documents` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filePath` to the `documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileType` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "documents" DROP COLUMN "created_at",
DROP COLUMN "fileUrl",
DROP COLUMN "name",
DROP COLUMN "updated_at",
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "filePath" TEXT NOT NULL,
ADD COLUMN     "fileType" TEXT NOT NULL,
ADD COLUMN     "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
