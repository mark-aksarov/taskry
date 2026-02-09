import {
  users,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
  projects,
} from "@/prisma/test-utils/data";

import prisma from "@/lib/prisma";
import { updateTask } from "../task.dal";
import { seed } from "@/prisma/test-utils/seed";
import { TaskStatus } from "@/generated/prisma/enums";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { AccessDeniedError, NotFoundError } from "../../utils/error";

describe("updateProject", () => {
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

  afterEach(async () => {
    await prisma.task.deleteMany();
  });

  it("should successfully update task", async () => {
    const taskId = 100;

    await prisma.task.create({
      data: {
        id: taskId,
        title: "Task 1",
        deadline: new Date(),
        projectId: 1,
        categoryId: 1,
        workspaceId: 1,
        status: TaskStatus.active,
      },
    });

    const result = await updateTask({
      id: taskId,
      title: "Updated Task Title",
    });

    expect(result).not.toBeNull();
    expect(result!.id).toBe(taskId);
    expect(result!.title).toBe("Updated Task Title");
  });

  it("should throw an error when trying to update a task from another workspace", async () => {
    const taskId = 100;

    await prisma.task.create({
      data: {
        id: taskId,
        title: "Task 1",
        deadline: new Date(),
        projectId: 2,
        categoryId: 2,
        workspaceId: 2,
        status: TaskStatus.active,
      },
    });

    const updateInput = {
      id: taskId,
      title: "Updated Task Title",
    };

    await expect(updateTask(updateInput)).rejects.toThrow();
  });

  it("should fail if the project belongs to a different workspace", async () => {
    const taskId = 100;

    await prisma.task.create({
      data: {
        id: taskId,
        title: "Task 1",
        deadline: new Date(),
        projectId: 1,
        categoryId: 1,
        workspaceId: 1,
        status: TaskStatus.active,
      },
    });

    const updateTaskPromise = updateTask({
      id: taskId,
      projectId: 999,
    });

    await expect(updateTaskPromise).rejects.toThrow(NotFoundError);
    await expect(updateTaskPromise).rejects.toThrow(/Project not found/i);
  });

  it("should fail if the assignee belongs to a different workspace", async () => {
    const taskId = 100;

    await prisma.task.create({
      data: {
        id: taskId,
        title: "Task 1",
        deadline: new Date(),
        projectId: 1,
        categoryId: 1,
        workspaceId: 1,
        status: TaskStatus.active,
      },
    });

    const updateTaskPromise = updateTask({
      id: taskId,
      assigneeId: "user-999",
    });

    await expect(updateTaskPromise).rejects.toThrow(NotFoundError);
    await expect(updateTaskPromise).rejects.toThrow(/Assignee not found/i);
  });

  it("should fail if the task category not found", async () => {
    const taskId = 100;

    await prisma.task.create({
      data: {
        id: taskId,
        title: "Task 1",
        deadline: new Date(),
        projectId: 1,
        categoryId: 1,
        workspaceId: 1,
        status: TaskStatus.active,
      },
    });

    const updateTaskPromise = updateTask({
      id: taskId,
      categoryId: 999,
    });

    await expect(updateTaskPromise).rejects.toThrow(NotFoundError);
    await expect(updateTaskPromise).rejects.toThrow(/Task category not found/i);
  });

  it("should fail if the project belongs to a different workspace", async () => {
    const taskId = 100;

    await prisma.task.create({
      data: {
        id: taskId,
        title: "Task 1",
        deadline: new Date(),
        projectId: 1,
        categoryId: 1,
        workspaceId: 1,
        status: TaskStatus.active,
      },
    });

    const updateTaskPromise = updateTask({
      id: taskId,
      projectId: 3,
    });

    await expect(updateTaskPromise).rejects.toThrow(AccessDeniedError);
    await expect(updateTaskPromise).rejects.toThrow(/Project access denied/i);
  });

  it("should fail if the assignee belongs to a different workspace", async () => {
    const taskId = 100;

    await prisma.task.create({
      data: {
        id: taskId,
        title: "Task 1",
        deadline: new Date(),
        projectId: 1,
        categoryId: 1,
        workspaceId: 1,
        status: TaskStatus.active,
      },
    });

    const updateTaskPromise = updateTask({
      id: taskId,
      assigneeId: "user-4",
    });

    await expect(updateTaskPromise).rejects.toThrow(AccessDeniedError);
    await expect(updateTaskPromise).rejects.toThrow(/Assignee access denied/i);
  });

  it("should fail if the task category belongs to a different workspace", async () => {
    const taskId = 100;

    await prisma.task.create({
      data: {
        id: taskId,
        title: "Task 1",
        deadline: new Date(),
        projectId: 1,
        categoryId: 1,
        workspaceId: 1,
        status: TaskStatus.active,
      },
    });

    const updateTaskPromise = updateTask({
      id: taskId,
      categoryId: 2,
    });

    await expect(updateTaskPromise).rejects.toThrow(AccessDeniedError);
    await expect(updateTaskPromise).rejects.toThrow(
      /Task category access denied/i,
    );
  });

  it("should fail if the project belongs to a different workspace", async () => {
    await expect(
      updateTask({
        id: 1,
        projectId: 2,
      }),
    ).rejects.toThrow();
  });

  it("should fail if the assignee belongs to a different workspace", async () => {
    await expect(
      updateTask({
        id: 1,
        assigneeId: "user-4",
      }),
    ).rejects.toThrow();
  });

  it("should fail if the task category belongs to a different workspace", async () => {
    await expect(
      updateTask({
        id: 1,
        categoryId: 2,
      }),
    ).rejects.toThrow();
  });

  describe("RBAC: update task", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      const taskId = 100;

      await prisma.task.create({
        data: {
          id: taskId,
          title: "Task 1",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          workspaceId: 1,
          status: TaskStatus.active,
        },
      });

      return {
        updateInput: {
          id: taskId,
          title: "Updated Task Title",
        },
      };
    };

    it("should succeed for owner", async () => {
      const { updateInput } = await setup("user-1", "owner");
      const result = await updateTask(updateInput);
      expect(result.title).toBe(updateInput.title);
    });

    it("should fail for user", async () => {
      const { updateInput } = await setup("user-2", "user");
      const result = await updateTask(updateInput);
      expect(result.title).toBe(updateInput.title);
    });

    it("should fail for guest", async () => {
      const { updateInput } = await setup("user-3", "guest");

      await expect(updateTask(updateInput)).rejects.toThrow(AccessDeniedError);
    });
  });
});
