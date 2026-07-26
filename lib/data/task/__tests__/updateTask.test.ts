import {
  users,
  positions,
  companies,
  clients,
  organizations,
  taskCategories,
  projectCategories,
  projects,
} from "@/prisma/seed/test-data";

import {
  NotFoundError,
  AccessDeniedError,
  UnauthorizedError,
} from "../../utils/error";

import prisma from "@/lib/prisma";
import { updateTask } from "../task.dal";
import { seed } from "@/prisma/test-seed";
import { setupAuth } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { TaskStatus } from "@/generated/prisma/enums";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";

describe("updateTask", () => {
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
        organizationId: "org-1",
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

  it("should throw an error when trying to update a task from another organization", async () => {
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
        organizationId: "org-2",
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
        organizationId: "org-1",
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
        organizationId: "org-1",
      },
    });

    const updateTaskPromise = updateTask({
      ...taskData,
      deadline: deadlineIso,
      assigneeId: "user-999",
    });

    await expect(updateTaskPromise).rejects.toThrow(NotFoundError);
    await expect(updateTaskPromise).rejects.toThrow(/User not found/i);
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
        organizationId: "org-1",
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

  it("should fail if the project belongs to a different organization", async () => {
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
        organizationId: "org-1",
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

  it("should fail if the assignee belongs to a different organization", async () => {
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
        organizationId: "org-1",
      },
    });

    const updateTaskPromise = updateTask({
      ...taskData,
      deadline: deadlineIso,
      assigneeId: "user-4",
    });

    await expect(updateTaskPromise).rejects.toThrow(AccessDeniedError);
    await expect(updateTaskPromise).rejects.toThrow(/User access denied/i);
  });

  it("should fail if the task category belongs to a different organization", async () => {
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
        organizationId: "org-1",
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
    const setup = async (userId?: string) => {
      await setupAuth(userId);

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
          organizationId: "org-1",
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
      const { updateInput } = await setup("user-1");
      const result = await updateTask(updateInput);
      expect(result).toBeDefined();
      expect(result!.title).toBe(updateInput.title);
    });

    it("should succeed for member", async () => {
      const { updateInput } = await setup("user-2");
      const result = await updateTask(updateInput);
      expect(result).toBeDefined();
      expect(result!.title).toBe(updateInput.title);
    });

    it("should fail for anonymous", async () => {
      const { updateInput } = await setup();

      await expect(updateTask(updateInput)).rejects.toThrow(UnauthorizedError);
    });
  });
});
