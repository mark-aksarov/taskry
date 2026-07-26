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

import prisma from "@/lib/prisma";
import { deleteTasks } from "../task.dal";
import { seed } from "@/prisma/test-seed";
import { setupAuth } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { TaskStatus } from "@/generated/prisma/enums";
import { UnauthorizedError } from "@/lib/data/utils/error";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";

describe("deleteTasks", () => {
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

  it("should successfully delete tasks", async () => {
    await prisma.task.createMany({
      data: [
        {
          id: 1,
          title: "Task 1",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          organizationId: "org-1",
          status: TaskStatus.active,
        },
        {
          id: 2,
          title: "Task 2",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          organizationId: "org-1",
          status: TaskStatus.active,
          assigneeId: "user-1",
        },
      ],
    });

    const result = await deleteTasks([1, 2]);

    expect(result.count).toBe(2);
    const remainingTasks = await prisma.task.findMany();

    expect(remainingTasks).toHaveLength(0);
  });

  it("should not delete tasks from a different organization", async () => {
    await prisma.task.createMany({
      data: [
        {
          id: 1,
          title: "Task 1",
          deadline: new Date(),
          projectId: 2,
          categoryId: 2,
          organizationId: "org-2",
          status: TaskStatus.active,
        },
      ],
    });

    const result = await deleteTasks([1]);

    expect(result.count).toBe(0);
  });

  it("should only delete tasks belonging to the current organization", async () => {
    await prisma.task.createMany({
      data: [
        {
          id: 1,
          title: "Task 1",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          organizationId: "org-1",
          status: TaskStatus.active,
        },
        {
          id: 2,
          title: "Task 2",
          deadline: new Date(),
          projectId: 2,
          categoryId: 2,
          organizationId: "org-2",
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

    const setup = async (userId?: string) => {
      await setupAuth(userId);

      await prisma.task.create({
        data: {
          id: taskId,
          title: "Task 1",
          deadline: new Date(),
          projectId: 1,
          categoryId: 1,
          organizationId: "org-1",
          status: TaskStatus.active,
        },
      });
    };

    it("should succeed for owner", async () => {
      await setup("user-1");
      const result = await deleteTasks([taskId]);
      expect(result.count).toBe(1);
    });

    it("should succeed for member", async () => {
      await setup("user-2");
      const result = await deleteTasks([taskId]);
      expect(result.count).toBe(1);
    });

    it("should fail for anonymous", async () => {
      await setup();
      await expect(deleteTasks([taskId])).rejects.toThrow(UnauthorizedError);
    });
  });
});
