/*
  Warnings:

  - The values [taskUpdated,projectUpdated,userAdded,userDeleted,userUpdated,customerAdded,customerDeleted,customerUpdated,commentReplied] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `parentId` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `targetName` on the `notification` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotificationType_new" AS ENUM ('projectAdded', 'projectDeadlineChanged', 'projectStatusChanged', 'projectDeleted', 'taskAdded', 'taskDeadlineChanged', 'taskStatusChanged', 'taskDeleted', 'commentAdded', 'commentChanged', 'commentDeleted');
ALTER TABLE "notification" ALTER COLUMN "type" TYPE "NotificationType_new" USING ("type"::text::"NotificationType_new");
ALTER TYPE "NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "public"."NotificationType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_parentId_fkey";

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "parentId";

-- AlterTable
ALTER TABLE "notification" DROP COLUMN "targetName",
ADD COLUMN     "content" TEXT;
