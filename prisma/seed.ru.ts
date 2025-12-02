//@ts-nocheck

import prisma from "@/lib/prisma";
import { users } from "./seed/ru/users";
import { tasks } from "./seed/ru/tasks";
import { subtasks } from "./seed/ru/subtasks";
import { projects } from "./seed/ru/projects";
import { positions } from "./seed/ru/positions";
import { companies } from "./seed/ru/companies";
import { customers } from "./seed/ru/customers";
import { taskStatuses } from "./seed/ru/taskStatuses";
import { taskComments } from "./seed/ru/taskComments";
import { taskCategories } from "./seed/ru/taskCategories";
import { projectStatuses } from "./seed/ru/projectStatuses";
import { taskAttachments } from "./seed/ru/taskAttachments";
import { projectComments } from "./seed/ru/projectComments";
import { projectCategories } from "./seed/ru/projectCategories";
import { projectAttachments } from "./seed/ru/projectAttachments";
import { notifications, notificationTargets } from "./seed/ru/notifications";

async function main() {
  const now = new Date();

  // ----------------- Guest workspace -----------------

  await prisma.workspace.create({
    data: {
      id: 1,
    },
  });

  // ----------------- Users -----------------

  await prisma.position.createMany({
    data: positions,
  });

  await prisma.user.createMany({
    data: users,
  });

  // ----------------- Customers -----------------

  await prisma.company.createMany({
    data: companies,
  });

  await prisma.customer.createMany({
    data: customers,
  });

  // ----------------- Projects -----------------

  await prisma.projectStatus.createMany({
    data: projectStatuses,
  });

  await prisma.projectCategory.createMany({
    data: projectCategories,
  });

  await prisma.project.createMany({
    data: projects,
  });

  await prisma.attachment.createMany({
    data: [
      {
        id: 1,
        fileUrl: "S3_URL/project_1_attachment_1.jpg",
        fileName: "project_1_attachment_1.jpg",
        projectId: 1,
      },
      {
        id: 2,
        fileUrl: "S3_URL/project_1_attachment_2.jpg",
        fileName: "project_1_attachment_2.jpg",
        projectId: 1,
      },
      {
        id: 3,
        fileUrl: "S3_URL/project_2_attachment_1.jpg",
        fileName: "project_2_attachment_1.jpg",
        projectId: 2,
      },
      {
        id: 4,
        fileUrl: "S3_URL/project_2_attachment_2.jpg",
        fileName: "project_2_attachment_2.jpg",
        projectId: 2,
      },
      {
        id: 5,
        fileUrl: "S3_URL/project_3_attachment_1.jpg",
        fileName: "project_3_attachment_1.jpg",
        projectId: 3,
      },
      {
        id: 6,
        fileUrl: "S3_URL/project_3_attachment_2.jpg",
        fileName: "project_3_attachment_2.jpg",
        projectId: 3,
      },
      {
        id: 7,
        fileUrl: "S3_URL/project_4_attachment_1.jpg",
        fileName: "project_4_attachment_1.jpg",
        projectId: 4,
      },
      {
        id: 8,
        fileUrl: "S3_URL/project_4_attachment_2.jpg",
        fileName: "project_4_attachment_2.jpg",
        projectId: 4,
      },
      {
        id: 9,
        fileUrl: "S3_URL/project_5_attachment_1.jpg",
        fileName: "project_5_attachment_1.jpg",
        projectId: 5,
      },
      {
        id: 10,
        fileUrl: "S3_URL/project_5_attachment_2.jpg",
        fileName: "project_5_attachment_2.jpg",
        projectId: 5,
      },
      {
        id: 11,
        fileUrl: "S3_URL/project_6_attachment_1.jpg",
        fileName: "project_6_attachment_1.jpg",
        projectId: 6,
      },
      {
        id: 12,
        fileUrl: "S3_URL/project_6_attachment_2.jpg",
        fileName: "project_6_attachment_2.jpg",
        projectId: 6,
      },
      {
        id: 13,
        fileUrl: "S3_URL/project_7_attachment_1.jpg",
        fileName: "project_7_attachment_1.jpg",
        projectId: 7,
      },
      {
        id: 14,
        fileUrl: "S3_URL/project_7_attachment_2.jpg",
        fileName: "project_7_attachment_2.jpg",
        projectId: 7,
      },
      {
        id: 15,
        fileUrl: "S3_URL/project_8_attachment_1.jpg",
        fileName: "project_8_attachment_1.jpg",
        projectId: 8,
      },
      {
        id: 16,
        fileUrl: "S3_URL/project_8_attachment_2.jpg",
        fileName: "project_8_attachment_2.jpg",
        projectId: 8,
      },
      {
        id: 17,
        fileUrl: "S3_URL/project_9_attachment_1.jpg",
        fileName: "project_9_attachment_1.jpg",
        projectId: 9,
      },
      {
        id: 18,
        fileUrl: "S3_URL/project_9_attachment_2.jpg",
        fileName: "project_9_attachment_2.jpg",
        projectId: 9,
      },
      {
        id: 19,
        fileUrl: "S3_URL/project_10_attachment_1.jpg",
        fileName: "project_10_attachment_1.jpg",
        projectId: 10,
      },
      {
        id: 20,
        fileUrl: "S3_URL/project_10_attachment_2.jpg",
        fileName: "project_10_attachment_2.jpg",
        projectId: 10,
      },
      {
        id: 21,
        fileUrl: "S3_URL/project_11_attachment_1.jpg",
        fileName: "project_11_attachment_1.jpg",
        projectId: 11,
      },
      {
        id: 22,
        fileUrl: "S3_URL/project_11_attachment_2.jpg",
        fileName: "project_11_attachment_2.jpg",
        projectId: 11,
      },
      {
        id: 23,
        fileUrl: "S3_URL/project_12_attachment_1.jpg",
        fileName: "project_12_attachment_1.jpg",
        projectId: 12,
      },
      {
        id: 24,
        fileUrl: "S3_URL/project_12_attachment_2.mp4",
        fileName: "project_12_attachment_2.mp4",
        projectId: 12,
      },
      {
        id: 25,
        fileUrl: "S3_URL/project_13_attachment_1.jpg",
        fileName: "project_13_attachment_1.jpg",
        projectId: 13,
      },
      {
        id: 26,
        fileUrl: "S3_URL/project_13_attachment_2.jpg",
        fileName: "project_13_attachment_2.jpg",
        projectId: 13,
      },
      {
        id: 27,
        fileUrl: "S3_URL/project_14_attachment_1.jpg",
        fileName: "project_14_attachment_1.jpg",
        projectId: 14,
      },
      {
        id: 28,
        fileUrl: "S3_URL/project_14_attachment_2.jpg",
        fileName: "project_14_attachment_2.jpg",
        projectId: 14,
      },
      {
        id: 29,
        fileUrl: "S3_URL/project_15_attachment_1.jpg",
        fileName: "project_15_attachment_1.jpg",
        projectId: 15,
      },
      {
        id: 30,
        fileUrl: "S3_URL/project_15_attachment_2.jpg",
        fileName: "project_15_attachment_2.jpg",
        projectId: 15,
      },
    ],
  });

  await prisma.comment.createMany({
    data: projectComments,
  });

  // ----------------- Tasks -----------------

  await prisma.taskStatus.createMany({
    data: taskStatuses,
  });

  await prisma.taskCategory.createMany({
    data: taskCategories,
  });

  await prisma.task.createMany({
    data: tasks,
  });

  await prisma.attachment.createMany({
    data: taskAttachments,
  });

  await prisma.comment.createMany({
    data: taskComments,
  });

  // ----------------- Subtasks -----------------

  await prisma.subtask.createMany({
    data: subtasks,
  });

  // ----------------- Notifications -----------------

  await prisma.notificationTarget.createMany({
    data: notificationTargets,
  });

  await prisma.notification.createMany({
    data: notifications,
  });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
