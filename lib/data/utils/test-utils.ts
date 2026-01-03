import prisma from "@/lib/prisma";

export async function resetDatabase() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
    "notification",
    "notification_target",
    "comment",  
    "task",
    "task_category",
    "project",
    "project_category",
    "customer",
    "company",
    "user",
    "position",
    "workspace",
    "account"
    RESTART IDENTITY CASCADE;
  `);
}
