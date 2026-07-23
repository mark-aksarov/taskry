-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "clientFullName" TEXT,
ADD COLUMN     "clientId" INTEGER,
ADD COLUMN     "userFullName" TEXT,
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
