/*
  Warnings:

  - You are about to drop the column `completion_badge` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "completion_badge",
ADD COLUMN     "completed_manga_count" INTEGER NOT NULL DEFAULT 0;
