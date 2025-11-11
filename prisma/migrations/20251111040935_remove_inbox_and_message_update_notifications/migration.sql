/*
  Warnings:

  - The values [MESSAGE_SENT] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `messageId` on the `attachment` table. All the data in the column will be lost.
  - You are about to drop the column `messageId` on the `notification_target` table. All the data in the column will be lost.
  - You are about to drop the column `messageId` on the `read` table. All the data in the column will be lost.
  - You are about to drop the `message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `message_thread` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notification_recipient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workspaceId` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."NotificationType_new" AS ENUM ('TASK_ADDED', 'TASK_DELETED', 'TASK_UPDATED', 'PROJECT_ADDED', 'PROJECT_DELETED', 'PROJECT_UPDATED', 'USER_ADDED', 'USER_DELETED', 'USER_UPDATED', 'CUSTOMER_ADDED', 'CUSTOMER_DELETED', 'CUSTOMER_UPDATED', 'COMMENT_REPLIED', 'COMMENT_ADDED');
ALTER TABLE "public"."notification" ALTER COLUMN "type" TYPE "public"."NotificationType_new" USING ("type"::text::"public"."NotificationType_new");
ALTER TYPE "public"."NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "public"."NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "public"."NotificationType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."attachment" DROP CONSTRAINT "attachment_messageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."message" DROP CONSTRAINT "message_messageThreadId_fkey";

-- DropForeignKey
ALTER TABLE "public"."message" DROP CONSTRAINT "message_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "public"."message" DROP CONSTRAINT "message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."message_thread" DROP CONSTRAINT "message_thread_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."notification_recipient" DROP CONSTRAINT "notification_recipient_notificationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."notification_recipient" DROP CONSTRAINT "notification_recipient_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."notification_recipient" DROP CONSTRAINT "notification_recipient_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."notification_target" DROP CONSTRAINT "notification_target_messageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."read" DROP CONSTRAINT "read_messageId_fkey";

-- DropIndex
DROP INDEX "public"."notification_target_messageId_key";

-- AlterTable
ALTER TABLE "public"."attachment" DROP COLUMN "messageId";

-- AlterTable
ALTER TABLE "public"."notification" ADD COLUMN     "recipientId" TEXT,
ADD COLUMN     "workspaceId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."notification_target" DROP COLUMN "messageId";

-- AlterTable
ALTER TABLE "public"."read" DROP COLUMN "messageId";

-- DropTable
DROP TABLE "public"."message";

-- DropTable
DROP TABLE "public"."message_thread";

-- DropTable
DROP TABLE "public"."notification_recipient";

-- CreateIndex
CREATE INDEX "notification_workspaceId_idx" ON "public"."notification"("workspaceId");

-- AddForeignKey
ALTER TABLE "public"."notification" ADD CONSTRAINT "notification_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notification" ADD CONSTRAINT "notification_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
