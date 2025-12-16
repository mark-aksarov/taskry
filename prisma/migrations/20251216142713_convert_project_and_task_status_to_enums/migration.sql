/*
  Warnings:

  - You are about to drop the column `statusId` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `task` table. All the data in the column will be lost.
  - You are about to drop the `project_status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task_status` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ProjectStatus" AS ENUM ('active', 'pending', 'completed');

-- CreateEnum
CREATE TYPE "public"."TaskStatus" AS ENUM ('active', 'pending', 'completed');

-- DropForeignKey
ALTER TABLE "public"."project" DROP CONSTRAINT "project_statusId_fkey";

-- DropForeignKey
ALTER TABLE "public"."task" DROP CONSTRAINT "task_statusId_fkey";

-- AlterTable
ALTER TABLE "public"."project" DROP COLUMN "statusId",
ADD COLUMN     "status" "public"."ProjectStatus" NOT NULL;

-- AlterTable
ALTER TABLE "public"."task" DROP COLUMN "statusId",
ADD COLUMN     "status" "public"."TaskStatus" NOT NULL;

-- DropTable
DROP TABLE "public"."project_status";

-- DropTable
DROP TABLE "public"."task_status";
