/*
  Warnings:

  - You are about to alter the column `name` on the `position` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "position" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);
