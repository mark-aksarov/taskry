/*
  Warnings:

  - You are about to drop the `notification_target` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "notification_target" DROP CONSTRAINT "notification_target_commentId_fkey";

-- DropForeignKey
ALTER TABLE "notification_target" DROP CONSTRAINT "notification_target_customerId_fkey";

-- DropForeignKey
ALTER TABLE "notification_target" DROP CONSTRAINT "notification_target_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "notification_target" DROP CONSTRAINT "notification_target_projectId_fkey";

-- DropForeignKey
ALTER TABLE "notification_target" DROP CONSTRAINT "notification_target_taskId_fkey";

-- DropForeignKey
ALTER TABLE "notification_target" DROP CONSTRAINT "notification_target_userId_fkey";

-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "commentId" INTEGER,
ADD COLUMN     "projectId" INTEGER,
ADD COLUMN     "taskId" INTEGER;

-- DropTable
DROP TABLE "notification_target";

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
