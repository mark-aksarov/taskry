import {
  users,
  clients,
  projects,
  positions,
  companies,
  organizations,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import {
  NotFoundError,
  AccessDeniedError,
  LimitExceededError,
  UnauthorizedError,
} from "@/lib/data/utils/error";

import prisma from "@/lib/prisma";
import { createTasks } from "../task.dal";
import { seed } from "@/prisma/test-seed";
import { setupAuth } from "@/lib/test-utils/auth";
import { TASK_MAX_COUNT } from "../../constants";
import { members } from "@/prisma/seed/test-data";
import { TaskStatus } from "@/generated/prisma/enums";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("createTasks", () => {
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

  it("should successfully create tasks", async () => {
    const result = await createTasks([
      {
        title: "Task 1",
        status: TaskStatus.active,
        projectId: 1,
        categoryId: 1,
        assigneeId: "user-2",
        deadline: "2025-12-31",
      },
      {
        title: "Task 2",
        status: TaskStatus.active,
        projectId: 1,
        categoryId: 1,
        assigneeId: "user-2",
        deadline: "2025-12-31",
      },
    ]);

    expect(result).toHaveLength(2);
    expect(result).toMatchObject([
      {
        title: "Task 1",
        status: TaskStatus.active,
        projectId: 1,
        categoryId: 1,
        assigneeId: "user-2",
        deadline: new Date("2025-12-31").toISOString(),
      },
      {
        title: "Task 2",
        status: TaskStatus.active,
        projectId: 1,
        categoryId: 1,
        assigneeId: "user-2",
        deadline: new Date("2025-12-31").toISOString(),
      },
    ]);
  });

  it("should fail if project not found", async () => {
    const createTasksPromise = createTasks([
      {
        title: "Task 1",
        status: TaskStatus.active,
        projectId: 999,
        categoryId: 1,
        assigneeId: "user-1",
        deadline: "2025-12-31",
      },
    ]);

    await expect(createTasksPromise).rejects.toThrow(NotFoundError);
    await expect(createTasksPromise).rejects.toThrow(/Project not found/i);
  });

  it("should fail if assignee not found", async () => {
    const createTasksPromise = createTasks([
      {
        title: "Task 1",
        status: TaskStatus.active,
        projectId: 1,
        categoryId: 1,
        assigneeId: "user-999",
        deadline: "2025-12-31",
      },
    ]);

    await expect(createTasksPromise).rejects.toThrow(NotFoundError);
    await expect(createTasksPromise).rejects.toThrow(/User not found/i);
  });

  it("should fail if task category not found", async () => {
    const createTasksPromise = createTasks([
      {
        title: "Task 1",
        status: TaskStatus.active,
        projectId: 1,
        categoryId: 999,
        assigneeId: "user-1",
        deadline: "2025-12-31",
      },
    ]);

    await expect(createTasksPromise).rejects.toThrow(NotFoundError);
    await expect(createTasksPromise).rejects.toThrow(
      /Task category not found/i,
    );
  });

  it("should fail if project belongs to another organization", async () => {
    const createTasksPromise = createTasks([
      {
        title: "Task 1",
        status: TaskStatus.active,
        projectId: 3,
        categoryId: 1,
        assigneeId: "user-1",
        deadline: "2025-12-31",
      },
    ]);

    await expect(createTasksPromise).rejects.toThrow(AccessDeniedError);
    await expect(createTasksPromise).rejects.toThrow(/Project access denied/i);
  });

  it("should fail if assignee belongs to another organization", async () => {
    const createTasksPromise = createTasks([
      {
        title: "Task 1",
        status: TaskStatus.active,
        projectId: 1,
        categoryId: 1,
        assigneeId: "user-4",
        deadline: "2025-12-31",
      },
    ]);

    await expect(createTasksPromise).rejects.toThrow(AccessDeniedError);
    await expect(createTasksPromise).rejects.toThrow(/User access denied/i);
  });

  it("should fail if task category belongs to another organization", async () => {
    const createTasksPromise = createTasks([
      {
        title: "Task 1",
        status: TaskStatus.active,
        projectId: 1,
        categoryId: 2,
        assigneeId: "user-1",
        deadline: "2025-12-31",
      },
    ]);

    await expect(createTasksPromise).rejects.toThrow(AccessDeniedError);
    await expect(createTasksPromise).rejects.toThrow(
      /Task category access denied/i,
    );
  });

  it("should create tasks without optional fields", async () => {
    const result = await createTasks([
      {
        title: "Task 1",
        status: TaskStatus.active,
        projectId: 1,
        deadline: "2025-12-31",
      },
    ]);

    expect(result[0].id).toBeDefined();
    expect(result[0].assigneeId).toBeUndefined();
    expect(result[0].categoryId).toBeUndefined();
  });

  it("should fail if task limit has been reached", async () => {
    const tasks = [];

    for (let i = 0; i < TASK_MAX_COUNT; i++) {
      tasks.push({
        title: `Task ${i}`,
        status: TaskStatus.active,
        projectId: 1,
        categoryId: 1,
        assigneeId: "user-2",
        deadline: new Date("2025-12-31"),
        organizationId: "org-1",
      });
    }

    await prisma.task.createMany({
      data: tasks,
    });

    const createTasksPromise = createTasks([
      {
        title: "Limit exceeded task",
        status: TaskStatus.active,
        projectId: 1,
        categoryId: 1,
        assigneeId: "user-2",
        deadline: "2025-12-31",
      },
    ]);

    await expect(createTasksPromise).rejects.toThrow(LimitExceededError);

    await prisma.task.deleteMany();
  }, 30000);

  describe("RBAC: create tasks", () => {
    const setup = async (userId?: string) => {
      await setupAuth(userId);

      return {
        createInput: [
          {
            title: "New Task",
            status: TaskStatus.active,
            projectId: 1,
            categoryId: 1,
            assigneeId: "user-2",
            deadline: "2025-12-31",
          },
        ],
      };
    };

    it("should succeed for owner", async () => {
      const { createInput } = await setup("user-1");

      const result = await createTasks(createInput);

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe(createInput[0].title);
    });

    it("should succeed for member", async () => {
      const { createInput } = await setup("user-2");

      const result = await createTasks(createInput);

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe(createInput[0].title);
    });

    it("should fail for anonymous", async () => {
      const { createInput } = await setup();

      await expect(createTasks(createInput)).rejects.toThrow(UnauthorizedError);
    });
  });
});
