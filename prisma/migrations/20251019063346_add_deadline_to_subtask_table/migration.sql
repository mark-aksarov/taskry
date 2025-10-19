/*
  Warnings:

  - Added the required column `deadline` to the `subtask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."subtask" ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL;
