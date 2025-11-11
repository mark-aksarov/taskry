/*
  Warnings:

  - You are about to drop the `read` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."read" DROP CONSTRAINT "read_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."read" DROP CONSTRAINT "read_userId_fkey";

-- AlterTable
ALTER TABLE "public"."notification" ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "public"."read";
