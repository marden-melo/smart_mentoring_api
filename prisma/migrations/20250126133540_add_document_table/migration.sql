/*
  Warnings:

  - You are about to drop the column `fileName` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `filePath` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `fileType` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `uploaded_at` on the `documents` table. All the data in the column will be lost.
  - Added the required column `fileUrl` to the `documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "documents" DROP COLUMN "fileName",
DROP COLUMN "filePath",
DROP COLUMN "fileType",
DROP COLUMN "uploaded_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fileUrl" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
