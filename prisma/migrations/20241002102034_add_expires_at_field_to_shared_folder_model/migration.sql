/*
  Warnings:

  - Added the required column `expiresAt` to the `SharedFolder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SharedFolder" ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
