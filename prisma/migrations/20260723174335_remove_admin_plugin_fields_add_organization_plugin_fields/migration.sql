/*
  Warnings:

  - You are about to drop the column `workspaceId` on the `attachment` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `client` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `comment` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `company` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `position` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `project_category` table. All the data in the column will be lost.
  - You are about to drop the column `impersonatedBy` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `task` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `task_category` table. All the data in the column will be lost.
  - You are about to drop the column `banExpires` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `banReason` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `banned` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `workspace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "attachment" DROP CONSTRAINT "attachment_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "client" DROP CONSTRAINT "client_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "company" DROP CONSTRAINT "company_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "position" DROP CONSTRAINT "position_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "project_category" DROP CONSTRAINT "project_category_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "task_category" DROP CONSTRAINT "task_category_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_workspaceId_fkey";

-- DropIndex
DROP INDEX "client_workspaceId_idx";

-- DropIndex
DROP INDEX "company_workspaceId_idx";

-- DropIndex
DROP INDEX "position_workspaceId_idx";

-- DropIndex
DROP INDEX "project_workspaceId_idx";

-- DropIndex
DROP INDEX "project_category_workspaceId_idx";

-- DropIndex
DROP INDEX "task_workspaceId_idx";

-- DropIndex
DROP INDEX "task_category_workspaceId_idx";

-- DropIndex
DROP INDEX "user_workspaceId_idx";

-- AlterTable
ALTER TABLE "attachment" DROP COLUMN "workspaceId",
ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "client" DROP COLUMN "workspaceId",
ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "comment" DROP COLUMN "workspaceId",
ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "company" DROP COLUMN "workspaceId",
ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "position" DROP COLUMN "workspaceId",
ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "project" DROP COLUMN "workspaceId",
ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "project_category" DROP COLUMN "workspaceId",
ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "session" DROP COLUMN "impersonatedBy",
ADD COLUMN     "activeOrganizationId" TEXT,
ADD COLUMN     "activeTeamId" TEXT;

-- AlterTable
ALTER TABLE "task" DROP COLUMN "workspaceId",
ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "task_category" DROP COLUMN "workspaceId",
ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "banExpires",
DROP COLUMN "banReason",
DROP COLUMN "banned",
DROP COLUMN "role",
DROP COLUMN "workspaceId",
ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "workspace";

-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "metadata" TEXT,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "member" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'member',
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitation" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inviterId" TEXT NOT NULL,

    CONSTRAINT "invitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_slug_key" ON "organization"("slug");

-- CreateIndex
CREATE INDEX "member_organizationId_idx" ON "member"("organizationId");

-- CreateIndex
CREATE INDEX "member_userId_idx" ON "member"("userId");

-- CreateIndex
CREATE INDEX "invitation_organizationId_idx" ON "invitation"("organizationId");

-- CreateIndex
CREATE INDEX "invitation_email_idx" ON "invitation"("email");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "client_organizationId_idx" ON "client"("organizationId");

-- CreateIndex
CREATE INDEX "company_organizationId_idx" ON "company"("organizationId");

-- CreateIndex
CREATE INDEX "position_organizationId_idx" ON "position"("organizationId");

-- CreateIndex
CREATE INDEX "project_organizationId_idx" ON "project"("organizationId");

-- CreateIndex
CREATE INDEX "project_category_organizationId_idx" ON "project_category"("organizationId");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE INDEX "task_organizationId_idx" ON "task"("organizationId");

-- CreateIndex
CREATE INDEX "task_category_organizationId_idx" ON "task_category"("organizationId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- AddForeignKey
ALTER TABLE "attachment" ADD CONSTRAINT "attachment_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_category" ADD CONSTRAINT "project_category_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_category" ADD CONSTRAINT "task_category_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "position" ADD CONSTRAINT "position_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
