-- CreateTable
CREATE TABLE "ViewCount" (
    "id" SERIAL NOT NULL,
    "postingId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ViewCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ViewCount_postingId_idx" ON "ViewCount"("postingId");

-- CreateIndex
CREATE INDEX "ViewCount_viewedAt_idx" ON "ViewCount"("viewedAt");

-- CreateIndex
CREATE INDEX "ViewCount_postingId_viewedAt_idx" ON "ViewCount"("postingId", "viewedAt");

-- AddForeignKey
ALTER TABLE "ViewCount" ADD CONSTRAINT "ViewCount_postingId_fkey" FOREIGN KEY ("postingId") REFERENCES "Posting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
