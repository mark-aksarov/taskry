import prisma from "@/lib/prisma";
import { createSubtask } from "../subtask.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { vi, describe, beforeEach, it, expect } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";
import { AccessDeniedError } from "../../utils/error";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/requireSession", () => ({
  requireSession: vi.fn(),
}));

describe("Subtask DAL", () => {
  beforeEach(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await prisma.workspace.createMany({ data: [{ id: 1 }, { id: 2 }] });

    await prisma.projectCategory.createMany({
      data: [
        { id: 1, name: "Project Category 1", workspaceId: 1 },
        { id: 2, name: "Project Category 2", workspaceId: 2 },
      ],
    });

    await prisma.taskCategory.createMany({
      data: [
        { id: 1, name: "Task Category 1", workspaceId: 1 },
        { id: 2, name: "Task Category 2", workspaceId: 2 },
      ],
    });

    await prisma.company.createMany({
      data: [
        { id: 1, name: "Company 1", workspaceId: 1 },
        { id: 2, name: "Company 2", workspaceId: 2 },
      ],
    });

    await prisma.user.createMany({
      data: [
        {
          id: "user-1",
          fullName: "User 1",
          email: "user-1@test.com",
          role: "owner",
          workspaceId: 1,
        },
        {
          id: "user-2",
          fullName: "User 2",
          email: "user-2@test.com",
          role: "user",
          workspaceId: 1,
        },
        {
          id: "user-3",
          fullName: "User 3",
          email: "user-3@test.com",
          role: "guest",
          workspaceId: 1,
        },
        {
          id: "user-4",
          fullName: "User 4",
          email: "user-4@test.com",
          role: "owner",
          workspaceId: 2,
        },
      ],
    });

    await prisma.customer.createMany({
      data: [
        {
          id: 1,
          fullName: "Customer 1",
          email: "customer-1@test.com",
          companyId: 1,
          workspaceId: 1,
        },
        {
          id: 2,
          fullName: "Customer 2",
          email: "customer-2@test.com",
          companyId: 1,
          workspaceId: 2,
        },
      ],
    });

    await prisma.project.createMany({
      data: [
        {
          id: 1,
          title: "Project 1",
          deadline: new Date(),
          categoryId: 1,
          workspaceId: 1,
          status: ProjectStatus.active,
        },
        {
          id: 2,
          title: "Project 2",
          deadline: new Date(),
          categoryId: 1,
          workspaceId: 2,
          status: ProjectStatus.active,
        },
      ],
    });

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
  });

  describe("createSubtask", () => {
    it("should successfully create a subtask", async () => {
      const input = {
        text: "Subtask 1",
        taskId: 1,
      };

      const result = await createSubtask(input);

      expect(result).toBeDefined();
      expect(result.text).toBe("Subtask 1");
      expect(result.taskId).toBe(1);
    });

    it("should throw an error if the task does not exist", async () => {
      const input = {
        text: "Subtask 1",
        taskId: 3,
      };

      await expect(createSubtask(input)).rejects.toThrow(AccessDeniedError);
    });

    it("should throw an error if the task belongs to a different workspace", async () => {
      const input = {
        text: "Subtask 1",
        taskId: 2,
      };

      await expect(createSubtask(input)).rejects.toThrow(AccessDeniedError);
    });

    describe("RBAC: create subtask", () => {
      it("should succeed for owner", async () => {
        (requireSession as any).mockResolvedValue({
          user: { id: "user-1", workspaceId: 1, role: "owner" },
        });

        const input = {
          text: "Subtask 1",
          taskId: 1,
        };

        const result = await createSubtask(input);
        expect(result).toBeDefined();
        expect(result.text).toBe("Subtask 1");
      });

      it("should succeed for user", async () => {
        (requireSession as any).mockResolvedValue({
          user: { id: "user-2", workspaceId: 1, role: "user" },
        });

        const input = {
          text: "Subtask 1",
          taskId: 1,
        };

        const result = await createSubtask(input);
        expect(result).toBeDefined();
        expect(result.text).toBe("Subtask 1");
      });

      it("should fail for guest", async () => {
        (requireSession as any).mockResolvedValue({
          user: { id: "user-3", workspaceId: 1, role: "guest" },
        });

        const input = {
          text: "Subtask 1",
          taskId: 1,
        };

        await expect(createSubtask(input)).rejects.toThrow(AccessDeniedError);
      });
    });
  });
});
