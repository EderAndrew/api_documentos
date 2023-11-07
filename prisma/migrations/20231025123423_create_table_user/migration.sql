-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "avatar" TEXT,
    "name" TEXT NOT NULL,
    "register" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "op" TEXT NOT NULL,
    "bank_op" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_register_key" ON "users"("register");
