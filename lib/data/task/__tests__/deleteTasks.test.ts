import {
  seedUsers,
  seedProjects,
  seedCustomers,
  seedCompanies,
  seedWorkspaces,
  seedTaskCategories,
  seedProjectCategories,
  seedPositions,
} from "@/lib/data/utils/test-utils";

import prisma from "@/lib/prisma";
import { deleteTasks } from "../task.dal";
import { TaskStatus } from "@/generated/prisma/enums";
import { resetDatabase } from "@/prisma/resetDatabase";
import { AccessDeniedError } from "@/lib/data/utils/error";
import { requireSession } from "@/lib/data/utils/requireSession";
import { it, expect, describe, beforeAll, afterEach } from "vitest";

describe("deleteCustomers", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();
    await seedWorkspaces();
    await seedPositions();
    await seedUsers();
    await seedProjectCategories();
    await seedTaskCategories();
    await seedCompanies();
    await seedCustomers();
    await seedProjects();
  });

  afterEach(async () => {
    await prisma.task.deleteMany();
  });

  it("should successfully delete tasks", async () => {
    await prisma.task.createMany({
      data: [
        {
          id: 1,
          title: "Task 1",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          workspaceId: 1,
          status: TaskStatus.active,
        },
        {
          id: 2,
          title: "Task 2",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          workspaceId: 1,
          status: TaskStatus.active,
          assigneeId: "user-3",
        },
      ],
    });

    const result = await deleteTasks([1, 2]);

    expect(result.count).toBe(2);
    const remainingTasks = await prisma.task.findMany();

    expect(remainingTasks).toHaveLength(0);
  });

  it("should not delete tasks from a different workspace", async () => {
    await prisma.task.createMany({
      data: [
        {
          id: 1,
          title: "Task 1",
          deadline: new Date(),
          projectId: 2,
          categoryId: 2,
          workspaceId: 2,
          status: TaskStatus.active,
        },
      ],
    });

    const result = await deleteTasks([1]);

    expect(result.count).toBe(0);
  });

  it("should only delete tasks belonging to the current workspace", async () => {
    await prisma.task.createMany({
      data: [
        {
          id: 1,
          title: "Task 1",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          workspaceId: 1,
          status: TaskStatus.active,
        },
        {
          id: 2,
          title: "Task 2",
          deadline: new Date(),
          projectId: 2,
          categoryId: 2,
          workspaceId: 2,
          status: TaskStatus.active,
        },
      ],
    });

    const validId = 1;
    const invalidId = 2;
    const mixedIds = [validId, invalidId];

    const result = await deleteTasks(mixedIds);

    expect(result.count).toBe(1);

    const task = await prisma.task.findUnique({
      where: { id: invalidId },
    });

    expect(task).not.toBeNull();
  });

  it("should return 0 if an empty array is provided", async () => {
    const result = await deleteTasks([]);
    expect(result.count).toBe(0);
  });

  describe("RBAC: delete tasks", () => {
    const taskId = 100;

    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

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
    };

    it("should succeed for owner", async () => {
      await setup("user-1", "owner");
      const result = await deleteTasks([taskId]);
      expect(result.count).toBe(1);
    });

    it("should fail for user", async () => {
      await setup("user-2", "user");
      const result = await deleteTasks([taskId]);
      expect(result.count).toBe(1);
    });

    it("should fail for guest", async () => {
      await setup("user-3", "guest");
      await expect(deleteTasks([taskId])).rejects.toThrow(AccessDeniedError);
    });
  });
});
