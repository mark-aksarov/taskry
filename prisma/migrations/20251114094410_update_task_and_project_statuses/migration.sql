/*
  Warnings:

  - The primary key for the `project_status` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `task_status` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."project" DROP CONSTRAINT "project_statusId_fkey";

-- DropForeignKey
ALTER TABLE "public"."task" DROP CONSTRAINT "task_statusId_fkey";

-- AlterTable
ALTER TABLE "public"."project" ALTER COLUMN "statusId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."project_status" DROP CONSTRAINT "project_status_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "project_status_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "project_status_id_seq";

-- AlterTable
ALTER TABLE "public"."task" ALTER COLUMN "statusId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."task_status" DROP CONSTRAINT "task_status_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "task_status_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "task_status_id_seq";

-- AddForeignKey
ALTER TABLE "public"."project" ADD CONSTRAINT "project_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "public"."project_status"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."task" ADD CONSTRAINT "task_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "public"."task_status"("id") ON DELETE CASCADE ON UPDATE CASCADE;
