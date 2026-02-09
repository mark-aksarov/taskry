import prisma from "@/lib/prisma";
import { E2ESeedPayload } from "./types";

export async function seed(payload: E2ESeedPayload) {
  if (payload.workspaces) {
    await prisma.workspace.createMany({
      data: payload.workspaces,
    });
    await syncSequence("workspace");
  }

  if (payload.positions) {
    await prisma.position.createMany({
      data: payload.positions,
    });
    await syncSequence("position");
  }

  if (payload.users) {
    await prisma.user.createMany({
      data: payload.users,
    });
  }

  if (payload.accounts) {
    await prisma.account.createMany({
      data: payload.accounts,
    });
  }

  if (payload.companies) {
    await prisma.company.createMany({
      data: payload.companies,
    });
    await syncSequence("company");
  }

  if (payload.customers) {
    await prisma.customer.createMany({
      data: payload.customers,
    });
    await syncSequence("customer");
  }

  if (payload.projectCategories) {
    await prisma.projectCategory.createMany({
      data: payload.projectCategories,
    });
    await syncSequence("project_category");
  }

  if (payload.projects) {
    await prisma.project.createMany({
      data: payload.projects,
    });
    await syncSequence("project");
  }

  if (payload.taskCategories) {
    await prisma.taskCategory.createMany({
      data: payload.taskCategories,
    });
    await syncSequence("task_category");
  }

  if (payload.tasks) {
    await prisma.task.createMany({
      data: payload.tasks,
    });
    await syncSequence("task");
  }

  if (payload.comments) {
    await prisma.comment.createMany({
      data: payload.comments,
    });
    await syncSequence("comment");
  }
}

async function syncSequence(tableName: string) {
  await prisma.$executeRawUnsafe(`
      SELECT setval(
        pg_get_serial_sequence('"${tableName}"', 'id'),
        COALESCE((SELECT MAX(id) + 1 FROM "${tableName}"), 1),
        false
      );
    `);
}
