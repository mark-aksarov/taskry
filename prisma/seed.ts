import prisma from "@/lib/prisma";
import { users as ruUsers } from "./seed/ru/users";
import { users as enUsers } from "./seed/en/users";
import { tasks as ruTasks } from "./seed/ru/tasks";
import { tasks as enTasks } from "./seed/en/tasks";
import { taskStatuses } from "./seed/common/taskStatuses";
import { subtasks as ruSubtasks } from "./seed/ru/subtasks";
import { subtasks as enSubtasks } from "./seed/en/subtasks";
import { projects as ruProjects } from "./seed/ru/projects";
import { projects as enProjects } from "./seed/en/projects";
import { positions as ruPositions } from "./seed/ru/positions";
import { positions as enPositions } from "./seed/en/positions";
import { companies as ruCompanies } from "./seed/ru/companies";
import { companies as enCompanies } from "./seed/en/companies";
import { customers as ruCustomers } from "./seed/ru/customers";
import { customers as enCustomers } from "./seed/en/customers";
import { workspace as ruWorkspace } from "./seed/ru/workspace";
import { workspace as enWorkspace } from "./seed/en/workspace";
import { projectStatuses } from "./seed/common/projectStatuses";
import { taskComments as ruTaskComments } from "./seed/ru/taskComments";
import { taskComments as enTaskComments } from "./seed/en/taskComments";
import { taskCategories as ruTaskCategories } from "./seed/ru/taskCategories";
import { taskCategories as enTaskCategories } from "./seed/en/taskCategories";
import { taskAttachments as ruTaskAttachments } from "./seed/ru/taskAttachments";
import { taskAttachments as enTaskAttachments } from "./seed/en/taskAttachments";
import { projectComments as ruProjectComments } from "./seed/ru/projectComments";
import { projectComments as enProjectComments } from "./seed/en/projectComments";
import { projectCategories as ruProjectCategories } from "./seed/ru/projectCategories";
import { projectCategories as enProjectCategories } from "./seed/en/projectCategories";
import { projectAttachments as ruProjectAttachments } from "./seed/ru/projectAttachments";
import { projectAttachments as enProjectAttachments } from "./seed/en/projectAttachments";
import {
  notifications as ruNotifications,
  notificationTargets as ruNotificationTargets,
} from "./seed/ru/notifications";
import {
  notifications as enNotifications,
  notificationTargets as enNotificationTargets,
} from "./seed/en/notifications";

async function main() {
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

  // ----------------- Customers -----------------

  await prisma.company.createMany({
    data: [...ruCompanies, ...enCompanies],
  });

  await prisma.customer.createMany({
    data: [...ruCustomers, ...enCustomers],
  });

  // ----------------- Projects -----------------

  await prisma.projectStatus.createMany({
    data: projectStatuses,
  });

  await prisma.projectCategory.createMany({
    data: [...ruProjectCategories, ...enProjectCategories],
  });

  await prisma.project.createMany({
    data: [...ruProjects, ...enProjects],
  });

  await prisma.attachment.createMany({
    data: [...ruProjectAttachments, ...enProjectAttachments],
  });

  await prisma.comment.createMany({
    data: [...ruProjectComments, ...enProjectComments],
  });

  // ----------------- Tasks -----------------

  await prisma.taskStatus.createMany({
    data: taskStatuses,
  });

  await prisma.taskCategory.createMany({
    data: [...ruTaskCategories, ...enTaskCategories],
  });

  await prisma.task.createMany({
    data: [...ruTasks, ...enTasks],
  });

  await prisma.attachment.createMany({
    data: [...ruTaskAttachments, ...enTaskAttachments],
  });

  await prisma.comment.createMany({
    data: [...ruTaskComments, ...enTaskComments],
  });

  // ----------------- Subtasks -----------------

  await prisma.subtask.createMany({
    data: [...ruSubtasks, ...enSubtasks],
  });

  // ----------------- Notifications -----------------

  await prisma.notificationTarget.createMany({
    data: [...ruNotificationTargets, ...enNotificationTargets],
  });

  await prisma.notification.createMany({
    data: [...ruNotifications, ...enNotifications],
  });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
