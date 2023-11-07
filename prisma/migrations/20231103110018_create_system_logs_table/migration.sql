-- CreateTable
CREATE TABLE "systemLogs" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "operator_register" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "systemLogs_pkey" PRIMARY KEY ("id")
);
