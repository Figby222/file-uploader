-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "destination" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "File_destination_key" ON "File"("destination");
