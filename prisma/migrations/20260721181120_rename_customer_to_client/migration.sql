-- DropForeignKey
ALTER TABLE "client" DROP CONSTRAINT "client_companyId_fkey";

-- AlterTable
ALTER TABLE "search_keywords" ALTER COLUMN "usage" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
