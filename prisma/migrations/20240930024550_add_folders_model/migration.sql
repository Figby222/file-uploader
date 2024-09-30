-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_parentFolderId_fkey";

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "folderId" DROP NOT NULL,
ALTER COLUMN "folderId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Folder" ALTER COLUMN "parentFolderId" DROP NOT NULL,
ALTER COLUMN "parentFolderId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_parentFolderId_fkey" FOREIGN KEY ("parentFolderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
