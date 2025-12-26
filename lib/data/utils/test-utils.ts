import prisma from "@/lib/prisma";

export async function resetDatabase() {
  await prisma.comment.deleteMany();
  await prisma.task.deleteMany();
  await prisma.taskCategory.deleteMany();
  await prisma.project.deleteMany();
  await prisma.projectCategory.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.company.deleteMany();
  await prisma.user.deleteMany();
  await prisma.position.deleteMany();
  await prisma.workspace.deleteMany();
}
