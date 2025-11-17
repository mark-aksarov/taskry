/*
  Warnings:

  - You are about to drop the column `name` on the `subtask` table. All the data in the column will be lost.
  - Added the required column `text` to the `subtask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."subtask" DROP COLUMN "name",
ADD COLUMN     "text" TEXT NOT NULL;
