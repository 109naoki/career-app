-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posting" (
    "id" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "pr" TEXT NOT NULL,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Posting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostingCategory" (
    "postingId" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "PostingCategory_pkey" PRIMARY KEY ("postingId","categoryId")
);

-- CreateIndex
CREATE INDEX "PostingCategory_categoryId_idx" ON "PostingCategory"("categoryId");

-- CreateIndex
CREATE INDEX "PostingCategory_postingId_idx" ON "PostingCategory"("postingId");

-- AddForeignKey
ALTER TABLE "PostingCategory" ADD CONSTRAINT "PostingCategory_postingId_fkey" FOREIGN KEY ("postingId") REFERENCES "Posting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostingCategory" ADD CONSTRAINT "PostingCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
