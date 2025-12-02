/*
  Warnings:

  - You are about to drop the column `deadline` on the `subtask` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."notification_target_commentId_key";

-- DropIndex
DROP INDEX "public"."notification_target_customerId_key";

-- DropIndex
DROP INDEX "public"."notification_target_projectId_key";

-- DropIndex
DROP INDEX "public"."notification_target_taskId_key";

-- AlterTable
ALTER TABLE "public"."subtask" DROP COLUMN "deadline";
