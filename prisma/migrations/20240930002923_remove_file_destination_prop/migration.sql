/*
  Warnings:

  - You are about to drop the column `destination` on the `File` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "File_destination_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "destination";
