import {
  users,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
  projects,
} from "@/prisma/seed/test-data";

import prisma from "@/lib/prisma";
import { updateTask } from "../task.dal";
import { seed } from "@/prisma/test-seed";
import { TaskStatus } from "@/generated/prisma/enums";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
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
    const deadlineIso = "2025-12-31";

    const taskData = {
      id: taskId,
      title: "Task 1",
      description: null,
      deadline: "2025-12-31",
      projectId: 1,
      categoryId: 1,
      status: TaskStatus.active,
      assigneeId: null,
    };

    await prisma.task.create({
      data: {
        ...taskData,
        deadline: new Date(deadlineIso),
        workspaceId: 1,
      },
    });

    const result = await updateTask({
      ...taskData,
      deadline: deadlineIso,
      title: "Updated Task Title",
    });

    expect(result).not.toBeNull();
    expect(result!.id).toBe(taskId);
    expect(result!.title).toBe("Updated Task Title");
  });

  it("should throw an error when trying to update a task from another workspace", async () => {
    const taskId = 100;
    const deadlineIso = "2025-12-31";

    const taskData = {
      id: taskId,
      title: "Task 1",
      description: null,
      projectId: 2,
      categoryId: 2,
      status: TaskStatus.active,
      assigneeId: null,
    };

    await prisma.task.create({
      data: {
        ...taskData,
        deadline: new Date(deadlineIso),
        workspaceId: 2,
      },
    });

    const updateInput = {
      ...taskData,
      deadline: deadlineIso,
      title: "Updated Task Title",
    };

    await expect(updateTask(updateInput)).rejects.toThrow();
  });

  it("should fail if the project not found", async () => {
    const taskId = 100;
    const deadlineIso = "2025-12-31";

    const taskData = {
      id: taskId,
      title: "Task 1",
      description: null,
      projectId: 1,
      categoryId: 1,
      status: TaskStatus.active,
      assigneeId: null,
    };

    await prisma.task.create({
      data: {
        ...taskData,
        deadline: new Date(deadlineIso),
        workspaceId: 1,
      },
    });

    const updateTaskPromise = updateTask({
      ...taskData,
      deadline: deadlineIso,
      projectId: 999,
    });

    await expect(updateTaskPromise).rejects.toThrow(NotFoundError);
    await expect(updateTaskPromise).rejects.toThrow(/Project not found/i);
  });

  it("should fail if the assignee not found", async () => {
    const taskId = 100;
    const deadlineIso = "2025-12-31";

    const taskData = {
      id: taskId,
      title: "Task 1",
      description: null,
      projectId: 1,
      categoryId: 1,
      status: TaskStatus.active,
      assigneeId: null,
    };

    await prisma.task.create({
      data: {
        ...taskData,
        deadline: new Date(deadlineIso),
        workspaceId: 1,
      },
    });

    const updateTaskPromise = updateTask({
      ...taskData,
      deadline: deadlineIso,
      assigneeId: "user-999",
    });

    await expect(updateTaskPromise).rejects.toThrow(NotFoundError);
    await expect(updateTaskPromise).rejects.toThrow(/Assignee not found/i);
  });

  it("should fail if the task category not found", async () => {
    const taskId = 100;
    const deadlineIso = "2025-12-31";

    const taskData = {
      id: taskId,
      title: "Task 1",
      description: null,
      projectId: 1,
      categoryId: 1,
      status: TaskStatus.active,
      assigneeId: null,
    };

    await prisma.task.create({
      data: {
        ...taskData,
        deadline: new Date(deadlineIso),
        workspaceId: 1,
      },
    });

    const updateTaskPromise = updateTask({
      ...taskData,
      deadline: deadlineIso,
      categoryId: 999,
    });

    await expect(updateTaskPromise).rejects.toThrow(NotFoundError);
    await expect(updateTaskPromise).rejects.toThrow(/Task category not found/i);
  });

  it("should fail if the project belongs to a different workspace", async () => {
    const taskId = 100;
    const deadlineIso = "2025-12-31";

    const taskData = {
      id: taskId,
      title: "Task 1",
      description: null,
      projectId: 1,
      categoryId: 1,
      status: TaskStatus.active,
      assigneeId: null,
    };

    await prisma.task.create({
      data: {
        ...taskData,
        deadline: new Date(deadlineIso),
        workspaceId: 1,
      },
    });

    const updateTaskPromise = updateTask({
      ...taskData,
      deadline: deadlineIso,
      projectId: 3,
    });

    await expect(updateTaskPromise).rejects.toThrow(AccessDeniedError);
    await expect(updateTaskPromise).rejects.toThrow(/Project access denied/i);
  });

  it("should fail if the assignee belongs to a different workspace", async () => {
    const taskId = 100;
    const deadlineIso = "2025-12-31";

    const taskData = {
      id: taskId,
      title: "Task 1",
      description: null,
      projectId: 1,
      categoryId: 1,
      status: TaskStatus.active,
      assigneeId: null,
    };

    await prisma.task.create({
      data: {
        ...taskData,
        deadline: new Date(deadlineIso),
        workspaceId: 1,
      },
    });

    const updateTaskPromise = updateTask({
      ...taskData,
      deadline: deadlineIso,
      assigneeId: "user-4",
    });

    await expect(updateTaskPromise).rejects.toThrow(AccessDeniedError);
    await expect(updateTaskPromise).rejects.toThrow(/Assignee access denied/i);
  });

  it("should fail if the task category belongs to a different workspace", async () => {
    const taskId = 100;
    const deadlineIso = "2025-12-31";

    const taskData = {
      id: taskId,
      title: "Task 1",
      description: null,
      projectId: 1,
      categoryId: 1,
      status: TaskStatus.active,
      assigneeId: null,
    };

    await prisma.task.create({
      data: {
        ...taskData,
        deadline: new Date(deadlineIso),
        workspaceId: 1,
      },
    });

    const updateTaskPromise = updateTask({
      ...taskData,
      deadline: deadlineIso,
      categoryId: 2,
    });

    await expect(updateTaskPromise).rejects.toThrow(AccessDeniedError);
    await expect(updateTaskPromise).rejects.toThrow(
      /Task category access denied/i,
    );
  });

  describe("RBAC: update task", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      const taskId = 100;
      const deadlineIso = "2025-12-31";

      const taskData = {
        id: taskId,
        description: null,
        title: "Task 1",
        projectId: 1,
        categoryId: 1,
        status: TaskStatus.active,
        assigneeId: null,
      };

      await prisma.task.create({
        data: {
          ...taskData,
          deadline: new Date(deadlineIso),
          workspaceId: 1,
        },
      });

      return {
        updateInput: {
          ...taskData,
          deadline: deadlineIso,
          title: "Updated Task Title",
        },
      };
    };

    it("should succeed for owner", async () => {
      const { updateInput } = await setup("user-1", "owner");
      const result = await updateTask(updateInput);
      expect(result).toBeDefined();
      expect(result!.title).toBe(updateInput.title);
    });

    it("should succeed for user", async () => {
      const { updateInput } = await setup("user-2", "user");
      const result = await updateTask(updateInput);
      expect(result).toBeDefined();
      expect(result!.title).toBe(updateInput.title);
    });

    it("should fail for guest", async () => {
      const { updateInput } = await setup("user-3", "guest");

      await expect(updateTask(updateInput)).rejects.toThrow(AccessDeniedError);
    });
  });
});
