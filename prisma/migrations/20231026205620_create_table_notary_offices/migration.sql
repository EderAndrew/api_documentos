-- CreateTable
CREATE TABLE "notaryOffices" (
    "id" SERIAL NOT NULL,
    "cns" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,

    CONSTRAINT "notaryOffices_pkey" PRIMARY KEY ("id")
);
