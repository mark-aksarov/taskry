import {
  users,
  positions,
  companies,
  clients,
  organizations,
  taskCategories,
  projectCategories,
  projects,
  tasks,
} from "@/prisma/seed/test-data";

import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { getTaskDetail } from "../task.dal";
import { loginAs } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { TaskStatus } from "@/generated/prisma/enums";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterAll } from "vitest";

describe("getTaskDetail", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions,
      users,
      companies,
      clients,
      taskCategories,
      projectCategories,
      projects,
      tasks,
    });

    await loginAs("user-1");

    await prisma.subtask.createMany({
      data: [
        {
          id: 1,
          taskId: 1,
          text: "Subtask 1",
          isDone: false,
        },
        {
          id: 2,
          taskId: 1,
          text: "Subtask 2",
          isDone: true,
        },
      ],
    });

    await prisma.comment.createMany({
      data: [
        {
          id: 1,
          taskId: 1,
          content: "Comment 1",
          senderId: "user-1",
          organizationId: "org-1",
        },
        {
          id: 2,
          taskId: 1,
          content: "Comment 2",
          senderId: "user-2",
          organizationId: "org-1",
        },
      ],
    });
  });

  afterAll(async () => {
    await prisma.task.deleteMany();
    await prisma.subtask.deleteMany();
    await prisma.comment.deleteMany();
  });

  it("should return a valid TaskDetailDTO", async () => {
    const result = await getTaskDetail(1);

    expect(result).toStrictEqual({
      id: 1,
      title: "Task 1",
      description: "Description 1",
      deadline: new Date("2030-12-31").toISOString(),
      status: TaskStatus.active,

      creator: undefined,
      assignee: {
        id: "user-1",
        fullName: "User 1",
        imageUrl: "/man.jpg",
      },
      project: {
        id: 1,
        title: "Project 1",
      },
      category: {
        id: 1,
        name: "Task Category 1",
      },

      subtasks: expect.arrayContaining([
        {
          id: 1,
          text: "Subtask 1",
          isDone: false,
        },
        {
          id: 2,
          text: "Subtask 2",
          isDone: true,
        },
      ]),

      commentsCount: 2,
    });
  });

  it("should return null", async () => {
    const failure = await getTaskDetail(999);
    expect(failure).toBeNull();
  });
});
