/*
  Warnings:

  - You are about to drop the column `pr` on the `Posting` table. All the data in the column will be lost.
  - You are about to drop the column `viewCount` on the `Posting` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - Added the required column `description` to the `Posting` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostingCategory" DROP CONSTRAINT "PostingCategory_postingId_fkey";

-- DropForeignKey
ALTER TABLE "ViewCount" DROP CONSTRAINT "ViewCount_postingId_fkey";

-- DropIndex
DROP INDEX "ViewCount_postingId_idx";

-- DropIndex
DROP INDEX "ViewCount_viewedAt_idx";

-- AlterTable
ALTER TABLE "Posting" DROP COLUMN "pr",
DROP COLUMN "viewCount",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age";

-- AddForeignKey
ALTER TABLE "PostingCategory" ADD CONSTRAINT "PostingCategory_postingId_fkey" FOREIGN KEY ("postingId") REFERENCES "Posting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ViewCount" ADD CONSTRAINT "ViewCount_postingId_fkey" FOREIGN KEY ("postingId") REFERENCES "Posting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
