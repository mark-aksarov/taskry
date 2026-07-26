import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

export interface TestSeedPayload {
  organizations?: Prisma.OrganizationCreateManyInput[];
  companies?: Prisma.CompanyCreateManyInput[];
  clients?: Prisma.ClientCreateManyInput[];
  projectCategories?: Prisma.ProjectCategoryCreateManyInput[];
  projects?: Prisma.ProjectCreateManyInput[];
  taskCategories?: Prisma.TaskCategoryCreateManyInput[];
  tasks?: Prisma.TaskCreateManyInput[];
  subtasks?: Prisma.SubtaskCreateManyInput[];
  users?: Prisma.UserCreateManyInput[];
  members?: Prisma.MemberCreateManyInput[];
  accounts?: Prisma.AccountCreateManyInput[];
  positions?: Prisma.PositionCreateManyInput[];
  comments?: Prisma.CommentCreateManyInput[];
  searchKeywords?: Prisma.SearchKeywordCreateManyInput[];
}

export async function seed(payload: TestSeedPayload) {
  if (payload.organizations) {
    await prisma.organization.createMany({
      data: payload.organizations,
    });
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

  if (payload.members) {
    await prisma.member.createMany({
      data: payload.members,
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

  if (payload.clients) {
    await prisma.client.createMany({
      data: payload.clients,
    });
    await syncSequence("client");
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

  if (payload.subtasks) {
    await prisma.subtask.createMany({
      data: payload.subtasks,
    });
    await syncSequence("subtask");
  }

  if (payload.comments) {
    await prisma.comment.createMany({
      data: payload.comments,
    });
    await syncSequence("comment");
  }

  if (payload.searchKeywords) {
    await prisma.searchKeyword.createMany({
      data: payload.searchKeywords,
    });
    await syncSequence("search_keywords");
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
