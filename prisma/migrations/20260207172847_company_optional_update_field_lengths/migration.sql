/*
  Warnings:

  - You are about to alter the column `bio` on the `client` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(5000)`.

*/
-- AlterTable
ALTER TABLE "client" ALTER COLUMN "fullName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "bio" SET DATA TYPE VARCHAR(5000),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(254),
ALTER COLUMN "companyId" DROP NOT NULL;
