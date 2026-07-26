import prisma from "@/lib/prisma";

export async function resetDatabase() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE
    "search_keywords",  
    "comment",  
    "task",
    "task_category",
    "project",
    "project_category",
    "client",
    "company",
    "user",
    "position",
    "organization",
    "member",
    "account"
    RESTART IDENTITY CASCADE;
  `);
}
