import {
  users,
  projects,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import {
  NotFoundError,
  AccessDeniedError,
  LimitExceededError,
} from "@/lib/data/utils/error";

import prisma from "@/lib/prisma";
import { createTasks } from "../task.dal";
import { seed } from "@/prisma/test-seed";
import { TASK_MAX_COUNT } from "../../constants";
import { TaskStatus } from "@/generated/prisma/enums";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("createTasks", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await seed({
      workspaces,
      positions,
      users,
      companies,
      customers,
      taskCategories,
      projectCategories,
      projects,
    });
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

  it("should fail if project belongs to another workspace", async () => {
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

  it("should fail if assignee belongs to another workspace", async () => {
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

  it("should fail if task category belongs to another workspace", async () => {
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
        workspaceId: 1,
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
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

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
      const { createInput } = await setup("user-1", "owner");

      const result = await createTasks(createInput);

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe(createInput[0].title);
    });

    it("should succeed for user", async () => {
      const { createInput } = await setup("user-2", "user");

      const result = await createTasks(createInput);

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe(createInput[0].title);
    });

    it("should fail for guest", async () => {
      const { createInput } = await setup("user-3", "guest");

      await expect(createTasks(createInput)).rejects.toThrow(AccessDeniedError);
    });
  });
});
