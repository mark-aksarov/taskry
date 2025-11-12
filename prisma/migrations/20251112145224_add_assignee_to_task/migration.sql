-- AlterTable
ALTER TABLE "public"."task" ADD COLUMN     "assigneeId" TEXT;

-- CreateIndex
CREATE INDEX "task_assigneeId_idx" ON "public"."task"("assigneeId");

-- AddForeignKey
ALTER TABLE "public"."task" ADD CONSTRAINT "task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
