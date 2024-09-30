/*
  Warnings:

  - A unique constraint covering the columns `[path]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "path" TEXT NOT NULL DEFAULT 'Unknown';

-- CreateIndex
CREATE UNIQUE INDEX "File_path_key" ON "File"("path");
