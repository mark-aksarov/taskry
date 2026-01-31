-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'companyAdded';
ALTER TYPE "NotificationType" ADD VALUE 'companyChanged';
ALTER TYPE "NotificationType" ADD VALUE 'companyDeleted';
ALTER TYPE "NotificationType" ADD VALUE 'positionAdded';
ALTER TYPE "NotificationType" ADD VALUE 'positionChanged';
ALTER TYPE "NotificationType" ADD VALUE 'positionDeleted';
ALTER TYPE "NotificationType" ADD VALUE 'subtaskAdded';
ALTER TYPE "NotificationType" ADD VALUE 'subtaskChanged';
ALTER TYPE "NotificationType" ADD VALUE 'subtaskDeleted';
ALTER TYPE "NotificationType" ADD VALUE 'projectCategoryAdded';
ALTER TYPE "NotificationType" ADD VALUE 'projectCategoryChanged';
ALTER TYPE "NotificationType" ADD VALUE 'projectCategoryDeleted';
ALTER TYPE "NotificationType" ADD VALUE 'taskCategoryAdded';
ALTER TYPE "NotificationType" ADD VALUE 'taskCategoryChanged';
ALTER TYPE "NotificationType" ADD VALUE 'taskCategoryDeleted';

-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "companyId" INTEGER,
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "positionId" INTEGER,
ADD COLUMN     "positionName" TEXT,
ADD COLUMN     "projectCategoryId" INTEGER,
ADD COLUMN     "projectCategoryName" TEXT,
ADD COLUMN     "subtaskId" INTEGER,
ADD COLUMN     "subtaskText" TEXT,
ADD COLUMN     "taskCategoryId" INTEGER,
ADD COLUMN     "taskCategoryName" TEXT;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_subtaskId_fkey" FOREIGN KEY ("subtaskId") REFERENCES "subtask"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_projectCategoryId_fkey" FOREIGN KEY ("projectCategoryId") REFERENCES "project_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_taskCategoryId_fkey" FOREIGN KEY ("taskCategoryId") REFERENCES "task_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "position"("id") ON DELETE SET NULL ON UPDATE CASCADE;
