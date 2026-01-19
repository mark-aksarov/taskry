/*
  Warnings:

  - The values [projectDeadlineChanged,projectStatusChanged,taskDeadlineChanged,taskStatusChanged] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `projectDeadline` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the column `projectStatus` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the column `taskDeadline` on the `notification` table. All the data in the column will be lost.
  - You are about to drop the column `taskStatus` on the `notification` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationType_new" AS ENUM ('projectAdded', 'projectChanged', 'projectDeleted', 'taskAdded', 'taskChanged', 'taskDeleted', 'commentAdded', 'commentChanged', 'commentDeleted', 'userAdded', 'userChanged', 'userDeleted', 'customerAdded', 'customerChanged', 'customerDeleted');
ALTER TABLE "notification" ALTER COLUMN "type" TYPE "NotificationType_new" USING ("type"::text::"NotificationType_new");
ALTER TYPE "NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "public"."NotificationType_old";
COMMIT;

-- AlterTable
ALTER TABLE "notification" DROP COLUMN "projectDeadline",
DROP COLUMN "projectStatus",
DROP COLUMN "taskDeadline",
DROP COLUMN "taskStatus";
