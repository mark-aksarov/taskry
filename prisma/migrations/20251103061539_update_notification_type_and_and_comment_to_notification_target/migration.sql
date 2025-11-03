/*
  Warnings:

  - The values [TASK_COMMENTED,PROJECT_COMMENTED,MESSAGE_SENDED] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[commentId]` on the table `notification_target` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."NotificationType_new" AS ENUM ('TASK_ADDED', 'TASK_DELETED', 'TASK_UPDATED', 'PROJECT_ADDED', 'PROJECT_DELETED', 'PROJECT_UPDATED', 'USER_ADDED', 'USER_DELETED', 'USER_UPDATED', 'CUSTOMER_ADDED', 'CUSTOMER_DELETED', 'CUSTOMER_UPDATED', 'MESSAGE_SENT', 'COMMENT_REPLIED', 'COMMENT_ADDED');
ALTER TABLE "public"."notification" ALTER COLUMN "type" TYPE "public"."NotificationType_new" USING ("type"::text::"public"."NotificationType_new");
ALTER TYPE "public"."NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "public"."NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "public"."NotificationType_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."notification_target" ADD COLUMN     "commentId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "notification_target_commentId_key" ON "public"."notification_target"("commentId");

-- AddForeignKey
ALTER TABLE "public"."notification_target" ADD CONSTRAINT "notification_target_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "public"."comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
