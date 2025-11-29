/*
  Warnings:

  - You are about to drop the column `nameRu` on the `project_status` table. All the data in the column will be lost.
  - You are about to drop the column `nameRu` on the `task_status` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."project_status" DROP COLUMN "nameRu";

-- AlterTable
ALTER TABLE "public"."task_status" DROP COLUMN "nameRu";
