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

import { createTask } from "../task.dal";
import { seed } from "@/prisma/test-utils/seed";
import { TaskStatus } from "@/generated/prisma/enums";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { AccessDeniedError, NotFoundError } from "@/lib/data/utils/error";

describe("createTask", () => {
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

  it("should successfully create a task", async () => {
    const projectId = 1;

    const result = await createTask({
      title: "New Task",
      status: TaskStatus.active,
      projectId: projectId,
      categoryId: 1,
      assigneeId: "user-2",
      deadline: new Date(),
    });

    expect(result).toBeDefined();
    expect(result.title).toBe(result.title);
    expect(result.workspaceId).toBe(1);
    expect(result.creatorId).toBe("user-1");
    expect(result.projectId).toBe(projectId);
  });

  it("should fail if the project not found", async () => {
    const createTaskPromise = createTask({
      title: "New Task",
      status: TaskStatus.active,
      projectId: 999,
      categoryId: 1,
      assigneeId: "user-1",
      deadline: new Date(),
    });

    await expect(createTaskPromise).rejects.toThrow(NotFoundError);
    await expect(createTaskPromise).rejects.toThrow(/Project not found/i);
  });

  it("should fail if the assignee not found", async () => {
    const createTaskPromise = createTask({
      title: "New Task",
      status: TaskStatus.active,
      projectId: 1,
      categoryId: 1,
      assigneeId: "user-999",
      deadline: new Date(),
    });

    await expect(createTaskPromise).rejects.toThrow(NotFoundError);
    await expect(createTaskPromise).rejects.toThrow(/Assignee not found/i);
  });

  it("should fail if the task category not found", async () => {
    const createTaskPromise = createTask({
      title: "New Task",
      status: TaskStatus.active,
      projectId: 1,
      categoryId: 999,
      assigneeId: "user-1",
      deadline: new Date(),
    });

    await expect(createTaskPromise).rejects.toThrow(NotFoundError);
    await expect(createTaskPromise).rejects.toThrow(/Task category not found/i);
  });

  it("should fail if the project belongs to a different workspace", async () => {
    const createTaskPromise = createTask({
      title: "New Task",
      status: TaskStatus.active,
      projectId: 3,
      categoryId: 1,
      assigneeId: "user-1",
      deadline: new Date(),
    });

    await expect(createTaskPromise).rejects.toThrow(AccessDeniedError);
    await expect(createTaskPromise).rejects.toThrow(/Project access denied/i);
  });

  it("should fail if the assignee belongs to a different workspace", async () => {
    const createTaskPromise = createTask({
      title: "New Task",
      status: TaskStatus.active,
      projectId: 1,
      categoryId: 1,
      assigneeId: "user-4",
      deadline: new Date(),
    });

    await expect(createTaskPromise).rejects.toThrow(AccessDeniedError);
    await expect(createTaskPromise).rejects.toThrow(/Assignee access denied/i);
  });

  it("should fail if the task category belongs to a different workspace", async () => {
    const createTaskPromise = createTask({
      title: "New Task",
      status: TaskStatus.active,
      projectId: 1,
      categoryId: 2,
      assigneeId: "user-1",
      deadline: new Date(),
    });

    await expect(createTaskPromise).rejects.toThrow(AccessDeniedError);
    await expect(createTaskPromise).rejects.toThrow(
      /Task category access denied/i,
    );
  });

  it("should create a task without optional fields", async () => {
    const result = await createTask({
      title: "New Task",
      status: TaskStatus.active,
      projectId: 1,
      deadline: new Date(),
    });

    expect(result.id).toBeDefined();
    expect(result.assigneeId).toBeNull();
  });

  describe("RBAC: create task", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      const createInput = {
        title: "New Task",
        status: TaskStatus.active,
        projectId: 1,
        categoryId: 1,
        assigneeId: "user-2",
        deadline: new Date(),
      };

      return {
        createInput,
      };
    };

    it("should succeed for owner", async () => {
      const { createInput } = await setup("user-1", "owner");
      const result = await createTask(createInput);
      expect(result).toBeDefined();
      expect(result.title).toBe(createInput.title);
    });

    it("should succeed for user", async () => {
      const { createInput } = await setup("user-2", "user");
      const result = await createTask(createInput);
      expect(result).toBeDefined();
      expect(result.title).toBe(createInput.title);
    });

    it("should fail for guest", async () => {
      const { createInput } = await setup("user-3", "guest");
      await expect(createTask(createInput)).rejects.toThrow(AccessDeniedError);
    });
  });
});
