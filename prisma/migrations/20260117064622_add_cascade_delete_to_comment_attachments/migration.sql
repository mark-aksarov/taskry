-- DropForeignKey
ALTER TABLE "attachment" DROP CONSTRAINT "attachment_commentId_fkey";

-- AddForeignKey
ALTER TABLE "attachment" ADD CONSTRAINT "attachment_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
