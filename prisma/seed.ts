import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import "dotenv/config";

import { users as ruUsers } from "./seed/ru_workspace/users";
import { users as enUsers } from "./seed/en_workspace/users";
import { tasks as ruTasks } from "./seed/ru_workspace/tasks";
import { tasks as enTasks } from "./seed/en_workspace/tasks";
import { searchKeywords } from "./seed/common/searchKeywords";
import { accounts as ruAccounts } from "./seed/ru_workspace/accounts";
import { accounts as enAccounts } from "./seed/en_workspace/accounts";
import { subtasks as ruSubtasks } from "./seed/ru_workspace/subtasks";
import { subtasks as enSubtasks } from "./seed/en_workspace/subtasks";
import { projects as ruProjects } from "./seed/ru_workspace/projects";
import { projects as enProjects } from "./seed/en_workspace/projects";
import { positions as ruPositions } from "./seed/ru_workspace/positions";
import { positions as enPositions } from "./seed/en_workspace/positions";
import { companies as ruCompanies } from "./seed/ru_workspace/companies";
import { companies as enCompanies } from "./seed/en_workspace/companies";
import { customers as ruCustomers } from "./seed/ru_workspace/customers";
import { customers as enCustomers } from "./seed/en_workspace/customers";
import { workspace as ruWorkspace } from "./seed/ru_workspace/workspace";
import { workspace as enWorkspace } from "./seed/en_workspace/workspace";
import { taskComments as ruTaskComments } from "./seed/ru_workspace/taskComments";
import { taskComments as enTaskComments } from "./seed/en_workspace/taskComments";
import { taskCategories as ruTaskCategories } from "./seed/ru_workspace/taskCategories";
import { taskCategories as enTaskCategories } from "./seed/en_workspace/taskCategories";
import { projectComments as ruProjectComments } from "./seed/ru_workspace/projectComments";
import { projectComments as enProjectComments } from "./seed/en_workspace/projectComments";
import { projectCategories as ruProjectCategories } from "./seed/ru_workspace/projectCategories";
import { projectCategories as enProjectCategories } from "./seed/en_workspace/projectCategories";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // ----------------- Search Keywords -----------------

  await prisma.searchKeyword.createMany({
    data: searchKeywords,
  });

  // ----------------- Workspaces -----------------

  await prisma.workspace.createMany({
    data: [ruWorkspace, enWorkspace],
  });

  // ----------------- Users -----------------

  await prisma.position.createMany({
    data: [...ruPositions, ...enPositions],
  });

  await prisma.user.createMany({
    data: [...ruUsers, ...enUsers],
  });

  // ----------------- Accounts -----------------

  await prisma.account.createMany({
    data: [...ruAccounts, ...enAccounts],
  });

  // ----------------- Customers -----------------

  await prisma.company.createMany({
    data: [...ruCompanies, ...enCompanies],
  });

  await prisma.customer.createMany({
    data: [...ruCustomers, ...enCustomers],
  });

  // ----------------- Projects -----------------

  await prisma.projectCategory.createMany({
    data: [...ruProjectCategories, ...enProjectCategories],
  });

  await prisma.project.createMany({
    data: [...ruProjects, ...enProjects],
  });

  await prisma.comment.createMany({
    data: [...ruProjectComments, ...enProjectComments],
  });

  // ----------------- Tasks -----------------

  await prisma.taskCategory.createMany({
    data: [...ruTaskCategories, ...enTaskCategories],
  });

  await prisma.task.createMany({
    data: [...ruTasks, ...enTasks],
  });

  await prisma.comment.createMany({
    data: [...ruTaskComments, ...enTaskComments],
  });

  // ----------------- Subtasks -----------------

  await prisma.subtask.createMany({
    data: [...ruSubtasks, ...enSubtasks],
  });

  // ----------------- Reset IDs -----------------

  const tables = [
    "comment",
    "company",
    "customer",
    "position",
    "project",
    "project_category",
    "subtask",
    "task",
    "task_category",
    "workspace",
  ];

  for (const table of tables) {
    await prisma.$executeRawUnsafe(`
      SELECT setval(
        pg_get_serial_sequence('"${table}"', 'id'),
        COALESCE((SELECT MAX(id) FROM "${table}"), 1)
      );
    `);
  }
}

main();
