/*
  Warnings:

  - You are about to drop the column `content` on the `notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notification" DROP COLUMN "content",
ADD COLUMN     "commentContent" TEXT,
ADD COLUMN     "projectDeadline" TIMESTAMP(3),
ADD COLUMN     "projectStatus" "ProjectStatus",
ADD COLUMN     "projectTitle" TEXT,
ADD COLUMN     "taskDeadline" TIMESTAMP(3),
ADD COLUMN     "taskStatus" "TaskStatus",
ADD COLUMN     "taskTitle" TEXT;
