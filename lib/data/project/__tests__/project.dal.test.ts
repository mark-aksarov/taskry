import {
  updateProject,
  createProject,
  deleteProjects,
  getProjectCount,
  updateProjectStatuses,
} from "../project.dal";

import prisma from "@/lib/prisma";
import { AccessDeniedError } from "../../utils/error";
import { resetDatabase } from "@/prisma/resetDatabase";
import { ProjectStatus } from "@/generated/prisma/enums";
import { requireSession } from "@/lib/data/utils/requireSession";
import { describe, it, expect, beforeEach, vi, beforeAll } from "vitest";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/requireSession", () => ({
  requireSession: vi.fn(),
}));

describe("Project DAL", () => {
  beforeEach(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await prisma.project.deleteMany();
  });

  beforeAll(async () => {
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
          role: "manager",
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
  });

  describe("getProjectCount", () => {
    it("should return total count of projects for the current workspace", async () => {
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
            workspaceId: 1,
            status: ProjectStatus.active,
          },
          {
            id: 3,
            title: "Project 3",
            deadline: new Date(),
            categoryId: 2,
            workspaceId: 2,
            status: ProjectStatus.active,
          },
        ],
      });

      const count = await getProjectCount();
      expect(count).toBe(2);
    });
  });

  describe("createProject", () => {
    it("should successfully create a task", async () => {
      const result = await createProject({
        title: "Project 1",
        description: "Description 1",
        deadline: new Date("2025-12-31"),
        status: ProjectStatus.active,
        categoryId: 1,
        customerId: 1,
      });

      expect(result).toBeDefined();
      expect(result.title).toBe(result.title);
      expect(result.workspaceId).toBe(1);
      expect(result.creatorId).toBe("user-1");
    });

    it("should throw error if category does not belong to the workspace", async () => {
      const createProjectPromise = createProject({
        title: "Project 1",
        deadline: new Date("2025-12-31"),
        categoryId: 2,
        customerId: 1,
        status: ProjectStatus.active,
      });

      await expect(createProjectPromise).rejects.toThrow(AccessDeniedError);
      await expect(createProjectPromise).rejects.toThrow(
        /Category access denied or not found/i,
      );
    });

    it("should throw error if customer does not belong to the workspace", async () => {
      const createProjectPromise = createProject({
        title: "Project 1",
        deadline: new Date("2025-12-31"),
        categoryId: 1,
        customerId: 2,
        status: ProjectStatus.active,
      });

      await expect(createProjectPromise).rejects.toThrow(AccessDeniedError);
      await expect(createProjectPromise).rejects.toThrow(
        /Customer access denied or not found/i,
      );
    });

    it("should create a project without optional fields", async () => {
      const result = await createProject({
        title: "Project 1",
        deadline: new Date("2025-12-31"),
        categoryId: 1,
        status: ProjectStatus.active,
      });

      expect(result.id).toBeDefined();
      expect(result.customerId).toBeNull();
    });

    describe("RBAC: create project", () => {
      const setup = async (userId: string, role: string) => {
        (requireSession as any).mockResolvedValue({
          user: { id: userId, workspaceId: 1, role },
        });

        const createInput = {
          title: "Project 1",
          deadline: new Date("2025-12-31"),
          categoryId: 1,
          customerId: 1,
          status: ProjectStatus.active,
        };

        return {
          createInput,
        };
      };

      it("should succeed for owner", async () => {
        const { createInput } = await setup("user-1", "owner");
        const result = await createProject(createInput);
        expect(result).toBeDefined();
        expect(result.title).toBe(createInput.title);
      });

      it("should succeed for user", async () => {
        const { createInput } = await setup("user-2", "user");
        const result = await createProject(createInput);
        expect(result).toBeDefined();
        expect(result.title).toBe(createInput.title);
      });

      it("should fail for guest", async () => {
        const { createInput } = await setup("user-3", "guest");
        await expect(createProject(createInput)).rejects.toThrow(
          AccessDeniedError,
        );
      });
    });
  });

  describe("updateProject", () => {
    it("should update project data", async () => {
      await prisma.project.create({
        data: {
          id: 1,
          title: "Project 1",
          deadline: new Date(),
          categoryId: 1,
          workspaceId: 1,
          status: ProjectStatus.active,
        },
      });

      const result = await updateProject({
        id: 1,
        title: "Updated Project Title",
        status: ProjectStatus.active,
      });

      expect(result).not.toBeNull();
      expect(result!.id).toBe(1);
      expect(result!.title).toBe("Updated Project Title");
    });

    it("should throw an error when trying to update a project from another workspace", async () => {
      await prisma.project.create({
        data: {
          id: 1,
          title: "Project 1",
          deadline: new Date(),
          categoryId: 1,
          workspaceId: 2,
          status: ProjectStatus.active,
        },
      });

      const updateProjectPromise = updateProject({
        id: 1,
        title: "Updated Project Title",
      });

      await expect(updateProjectPromise).rejects.toThrow(
        PrismaClientKnownRequestError,
      );
      await expect(updateProjectPromise).rejects.toMatchObject({
        code: "P2025",
      });
    });

    describe("RBAC: update project", () => {
      const setup = async (userId: string, role: string) => {
        (requireSession as any).mockResolvedValue({
          user: { id: userId, workspaceId: 1, role },
        });

        await prisma.project.create({
          data: {
            id: 1,
            title: "Project 1",
            deadline: new Date(),
            categoryId: 1,
            workspaceId: 1,
            status: ProjectStatus.active,
          },
        });

        return {
          updateInput: {
            id: 1,
            title: "Updated Project Title",
          },
        };
      };

      it("should succeed for owner", async () => {
        const { updateInput } = await setup("user-1", "owner");
        const result = await updateProject(updateInput);
        expect(result.title).toBe(updateInput.title);
      });

      it("should fail for user", async () => {
        const { updateInput } = await setup("user-2", "user");
        const result = await updateProject(updateInput);
        expect(result.title).toBe(updateInput.title);
      });

      it("should fail for guest", async () => {
        const { updateInput } = await setup("user-3", "guest");

        await expect(updateProject(updateInput)).rejects.toThrow(
          AccessDeniedError,
        );
      });
    });
  });

  describe("updateProjectStatuses", () => {
    it("should update multiple project statuses", async () => {
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
            workspaceId: 1,
            status: ProjectStatus.active,
          },
          {
            id: 3,
            title: "Project 3",
            deadline: new Date(),
            categoryId: 2,
            workspaceId: 2,
            status: ProjectStatus.active,
          },
        ],
      });

      const projectIds = [1, 2];
      const nextStatus = ProjectStatus.completed;

      const updatedProjects = await updateProjectStatuses(
        projectIds,
        nextStatus,
      );

      expect(updatedProjects.length).toBe(2);
      expect(updatedProjects).toEqual([
        expect.objectContaining({ id: 1, status: nextStatus }),
        expect.objectContaining({ id: 2, status: nextStatus }),
      ]);
    });

    it("should return empty array when attempting to update projects from a different workspace", async () => {
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
            categoryId: 2,
            workspaceId: 2,
            status: ProjectStatus.active,
          },
        ],
      });

      const projectIds = [2];

      const result = await updateProjectStatuses(projectIds, "completed");

      expect(result.length).toBe(0);
    });

    describe("RBAC: update project statuses", () => {
      const setup = async (userId: string, role: string) => {
        (requireSession as any).mockResolvedValue({
          user: { id: userId, role, workspaceId: 1 },
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
              workspaceId: 1,
              status: ProjectStatus.active,
            },
          ],
        });
      };

      it("should succeed for owner", async () => {
        await setup("user-1", "owner");

        const updatedProjects = await updateProjectStatuses(
          [1, 2],
          "completed",
        );

        expect(updatedProjects.length).toBe(2);
        expect(updatedProjects![0].status).toBe("completed");
      });

      it("should succeed for assignee user", async () => {
        await setup("user-2", "user");

        const updatedProjects = await updateProjectStatuses(
          [1, 2],
          "completed",
        );

        expect(updatedProjects.length).toBe(2);
        expect(updatedProjects![0].status).toBe("completed");
      });

      it("should fail for guest", async () => {
        await setup("user-3", "guest");

        await expect(
          updateProjectStatuses([1, 2], "completed"),
        ).rejects.toThrow(AccessDeniedError);
      });
    });
  });

  describe("deleteProjects", () => {
    it("should successfully delete projects", async () => {
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
            workspaceId: 1,
            status: ProjectStatus.active,
          },
        ],
      });

      const result = await deleteProjects([1, 2]);

      expect(result.count).toBe(2);
      const remainingTasks = await prisma.project.findMany();

      expect(remainingTasks).toHaveLength(0);
    });

    it("should not delete projects from a different workspace", async () => {
      await prisma.project.createMany({
        data: [
          {
            id: 1,
            title: "Project 1",
            deadline: new Date(),
            categoryId: 2,
            workspaceId: 2,
            status: ProjectStatus.active,
          },
        ],
      });

      const result = await deleteProjects([1]);

      expect(result.count).toBe(0);
    });

    it("should only delete projects belonging to the current workspace", async () => {
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
            categoryId: 2,
            workspaceId: 2,
            status: ProjectStatus.active,
          },
        ],
      });

      const result = await deleteProjects([1, 2]);

      expect(result.count).toBe(1);

      const project = await prisma.project.findUnique({
        where: { id: 2 },
      });
      expect(project).not.toBeNull();
    });

    it("should return 0 if an empty array is provided", async () => {
      const result = await deleteProjects([]);
      expect(result.count).toBe(0);
    });

    describe("RBAC: delete projects", () => {
      const setup = async (userId: string, role: string) => {
        (requireSession as any).mockResolvedValue({
          user: { id: userId, workspaceId: 1, role },
        });

        await prisma.project.create({
          data: {
            id: 1,
            title: "Project 1",
            deadline: new Date(),
            categoryId: 1,
            workspaceId: 1,
            status: ProjectStatus.active,
          },
        });
      };

      it("should succeed for owner", async () => {
        await setup("user-1", "owner");
        const result = await deleteProjects([1]);
        expect(result.count).toBe(1);
      });

      it("should fail for user", async () => {
        await setup("user-2", "user");
        const result = await deleteProjects([1]);
        expect(result.count).toBe(1);
      });

      it("should fail for guest", async () => {
        await setup("user-3", "guest");
        await expect(deleteProjects([1])).rejects.toThrow(AccessDeniedError);
      });
    });
  });
});
