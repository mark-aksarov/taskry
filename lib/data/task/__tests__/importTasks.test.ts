import {
  users,
  clients,
  members,
  projects,
  companies,
  positions,
  organizations,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import {
  NotFoundError,
  UnauthorizedError,
  LimitExceededError,
} from "@/lib/data/utils/error";

import prisma from "@/lib/prisma";
import { importTasks } from "../task.dal";
import { seed } from "@/prisma/test-seed";
import { TASK_MAX_COUNT } from "../../constants";
import { setupAuth } from "@/lib/test-utils/auth";
import { TaskStatus } from "@/generated/prisma/enums";
import { beforeAll, describe, expect, it } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("importTasks", () => {
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
    });

    await setupAuth("user-1");
  });

  it("should successfully import tasks", async () => {
    const result = await importTasks([
      {
        title: "Imported task 1",
        description: "Description",
        deadline: "2026-08-01",
        status: TaskStatus.active,
        projectTitle: "Project 1",
        categoryName: "Task Category 1",
        assigneeEmail: "user-2@test.com",
      },
      {
        title: "Imported task 2",
        description: undefined,
        deadline: "2026-08-02",
        status: TaskStatus.pending,
        projectTitle: "Project 1",
        categoryName: "Task Category 1",
        assigneeEmail: "user-2@test.com",
      },
    ]);

    expect(result).toHaveLength(2);

    expect(result).toMatchObject([
      {
        title: "Imported task 1",
        description: "Description",
        status: TaskStatus.active,
      },
      {
        title: "Imported task 2",
        status: TaskStatus.pending,
      },
    ]);
  });

  it("should fail if project not found", async () => {
    const promise = importTasks([
      {
        title: "Task",
        deadline: "2026-08-01",
        status: TaskStatus.active,
        projectTitle: "Unknown project",
      },
    ]);

    await expect(promise).rejects.toThrow(NotFoundError);
    await expect(promise).rejects.toThrow(/Projects not found/i);
  });

  it("should fail if category not found", async () => {
    const promise = importTasks([
      {
        title: "Task",
        deadline: "2026-08-01",
        status: TaskStatus.active,
        projectTitle: "Project 1",
        categoryName: "Unknown category",
      },
    ]);

    await expect(promise).rejects.toThrow(NotFoundError);
    await expect(promise).rejects.toThrow(/Categories not found/i);
  });

  it("should fail if assignee not found", async () => {
    const promise = importTasks([
      {
        title: "Task",
        deadline: "2026-08-01",
        status: TaskStatus.active,
        projectTitle: "Project 1",
        assigneeEmail: "unknown@test.com",
      },
    ]);

    await expect(promise).rejects.toThrow(NotFoundError);
    await expect(promise).rejects.toThrow(/Assignees not found/i);
  });

  it("should create tasks without optional fields", async () => {
    const result = await importTasks([
      {
        title: "Task without relations",
        deadline: "2026-08-01",
        status: TaskStatus.active,
      },
    ]);

    expect(result).toHaveLength(1);

    expect(result[0]).toMatchObject({
      title: "Task without relations",
      status: TaskStatus.active,
    });

    expect(result[0].projectId).toBeUndefined();
    expect(result[0].categoryId).toBeUndefined();
    expect(result[0].assigneeId).toBeUndefined();
  });

  it("should fail if project belongs to another organization", async () => {
    await prisma.project.create({
      data: {
        title: "Other organization project",
        deadline: new Date(),
        status: "active",
        organizationId: "org-2",
      },
    });

    const promise = importTasks([
      {
        title: "Task",
        deadline: "2026-08-01",
        status: TaskStatus.active,
        projectTitle: "Other organization project",
      },
    ]);

    await expect(promise).rejects.toThrow(NotFoundError);
    await expect(promise).rejects.toThrow(/Projects not found/i);
  });

  it("should fail if task limit has been reached", async () => {
    const tasks = Array.from({ length: TASK_MAX_COUNT }, (_, index) => ({
      title: `Task ${index}`,
      status: TaskStatus.active,
      deadline: new Date("2026-08-01"),
      organizationId: "org-1",
      creatorId: "user-1",
    }));

    await prisma.task.createMany({
      data: tasks,
    });

    const promise = importTasks([
      {
        title: "Limit exceeded task",
        deadline: "2026-08-01",
        status: TaskStatus.active,
      },
    ]);

    await expect(promise).rejects.toThrow(LimitExceededError);

    await prisma.task.deleteMany();
  }, 30000);

  describe("RBAC: import tasks", () => {
    const setup = async (userId?: string) => {
      await setupAuth(userId);

      return {
        input: [
          {
            title: "Imported task",
            deadline: "2026-08-01",
            status: TaskStatus.active,
            projectTitle: "Project 1",
            categoryName: "Task Category 1",
            assigneeEmail: "user-2@test.com",
          },
        ],
      };
    };

    it("should succeed for owner", async () => {
      const { input } = await setup("user-1");

      const result = await importTasks(input);

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Imported task");
    });

    it("should succeed for member", async () => {
      const { input } = await setup("user-2");

      const result = await importTasks(input);

      expect(result).toHaveLength(1);
    });

    it("should fail for anonymous", async () => {
      const { input } = await setup();

      await expect(importTasks(input)).rejects.toThrow(UnauthorizedError);
    });
  });
});
