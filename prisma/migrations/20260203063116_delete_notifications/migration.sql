/*
  Warnings:

  - You are about to drop the `notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_actorId_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_commentId_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_companyId_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_customerId_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_positionId_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_projectCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_projectId_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_recipientId_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_subtaskId_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_taskCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_taskId_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_workspaceId_fkey";

-- DropTable
DROP TABLE "notification";

-- DropEnum
DROP TYPE "NotificationType";
