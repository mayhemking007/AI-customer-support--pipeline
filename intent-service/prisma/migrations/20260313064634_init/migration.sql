-- CreateTable
CREATE TABLE "Intent" (
    "id" TEXT NOT NULL,
    "queryId" TEXT NOT NULL,
    "intent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Intent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Intent_queryId_key" ON "Intent"("queryId");
