/*
  Warnings:

  - You are about to drop the `comment_like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."comment_like" DROP CONSTRAINT "comment_like_commentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."comment_like" DROP CONSTRAINT "comment_like_positionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."comment_like" DROP CONSTRAINT "comment_like_userId_fkey";

-- DropTable
DROP TABLE "public"."comment_like";
