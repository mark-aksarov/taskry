/*
  Warnings:

  - Added the required column `fileName` to the `attachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."attachment" ADD COLUMN     "fileName" TEXT NOT NULL;
