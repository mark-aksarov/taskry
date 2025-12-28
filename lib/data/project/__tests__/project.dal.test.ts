import {
  updateProject,
  createProject,
  deleteProjects,
  getProjectCount,
  updateProjects,
} from "../project.dal";
import prisma from "@/lib/prisma";
import { resetDatabase } from "@/lib/data/utils/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { verifySession } from "@/lib/data/utils/verifySession";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/verifySession", () => ({
  verifySession: vi.fn(),
}));

describe("Project DAL", () => {
  beforeEach(async () => {
    (verifySession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    // workspace 1

    await prisma.workspace.create({
      data: {
        id: 1,
      },
    });

    await prisma.user.create({
      data: {
        id: "user-1",
        fullName: "Alice Johnson",
        email: "alice@ws1.com",
        workspaceId: 1,
      },
    });

    await prisma.company.create({
      data: {
        id: 1,
        name: "WS1 Company",
        workspaceId: 1,
      },
    });

    await prisma.customer.create({
      data: {
        id: 1,
        fullName: "John Customer",
        email: "john.customer@ws1.com",
        workspaceId: 1,
        companyId: 1,
      },
    });

    await prisma.projectCategory.create({
      data: {
        id: 1,
        name: "Development",
        workspaceId: 1,
      },
    });

    await prisma.project.createMany({
      data: [
        {
          id: 1,
          workspaceId: 1,
          title: "Website Redesign",
          description: "Redesign corporate website",
          deadline: new Date("2025-03-01"),
          creatorId: "user-1",
          categoryId: 1,
          customerId: 1,
          status: ProjectStatus.active,
        },
        {
          id: 2,
          workspaceId: 1,
          title: "Internal Dashboard",
          description: "Build admin dashboard",
          deadline: new Date("2025-05-15"),
          creatorId: "user-1",
          categoryId: 1,
          customerId: 1,
          status: ProjectStatus.completed,
        },
      ],
    });

    // workspace 2

    await prisma.workspace.create({
      data: {
        id: 2,
      },
    });

    await prisma.user.create({
      data: {
        id: "user-2",
        fullName: "Bob Smith",
        email: "bob@ws2.com",
        workspaceId: 2,
      },
    });

    await prisma.company.create({
      data: {
        id: 2,
        name: "WS2 Company",
        workspaceId: 2,
      },
    });

    await prisma.customer.create({
      data: {
        id: 2,
        fullName: "Emma Client",
        email: "emma.client@ws2.com",
        workspaceId: 2,
        companyId: 2,
      },
    });

    await prisma.projectCategory.create({
      data: {
        id: 2,
        name: "Marketing",
        workspaceId: 2,
      },
    });

    await prisma.project.createMany({
      data: [
        {
          id: 3,
          workspaceId: 2,
          title: "Ad Campaign",
          description: "Launch Google Ads campaign",
          deadline: new Date("2025-02-10"),
          creatorId: "user-2",
          categoryId: 2,
          customerId: 2,
          status: ProjectStatus.active,
        },
        {
          id: 4,
          workspaceId: 2,
          title: "Brand Strategy",
          description: "Create brand positioning",
          deadline: new Date("2025-06-01"),
          creatorId: "user-2",
          categoryId: 2,
          customerId: 2,
          status: ProjectStatus.completed,
        },
      ],
    });
  });

  describe("getProjectCount", () => {
    it("should return total count of projects for the current workspace", async () => {
      const count = await getProjectCount();

      expect(count).toBe(2);
    });

    it("should return total count of projects for workspace 2", async () => {
      (verifySession as any).mockResolvedValue({
        user: { workspaceId: 2 },
      });

      const count = await getProjectCount();

      expect(count).toBe(2);
    });

    it("should return filtered count based on status", async () => {
      const count = await getProjectCount({
        category: [],
        customer: [],
        user: [],
        status: [ProjectStatus.active],
      });

      expect(count).toBe(1);
    });

    it("should return 0 if no projects match filters", async () => {
      const count = await getProjectCount({
        category: [],
        customer: [],
        user: [],
        status: [ProjectStatus.pending],
      });

      expect(count).toBe(0);
    });

    it("should return filtered count by category", async () => {
      (verifySession as any).mockResolvedValue({
        user: { workspaceId: 2 },
      });

      const count = await getProjectCount({
        category: [2],
        customer: [],
        user: [],
        status: [],
      });

      expect(count).toBe(2);

      const countEmpty = await getProjectCount({
        category: [1],
        customer: [],
        user: [],
        status: [],
      });

      expect(countEmpty).toBe(0);
    });
  });

  describe("createProject", () => {
    it("should successfully create a project with correct data and creatorId", async () => {
      const input = {
        title: "New Integration Test",
        description: "Verify creation logic",
        deadline: new Date("2025-12-31"),
        status: ProjectStatus.active,
        categoryId: 1,
        customerId: 1,
      };

      await createProject(input);

      const createdProject = await prisma.project.findFirst({
        where: { title: "New Integration Test" },
      });

      expect(createdProject).toBeDefined();
      expect(createdProject?.creatorId).toBe("user-1");
      expect(createdProject?.workspaceId).toBe(1);
      expect(createdProject?.categoryId).toBe(1);
    });

    it("should throw error if category does not belong to the workspace", async () => {
      const input = {
        title: "Invalid Category Project",
        categoryId: 2,
        customerId: 1,
        status: ProjectStatus.active,
      } as any;

      await expect(createProject(input)).rejects.toThrow();

      const count = await prisma.project.count({
        where: { title: "Invalid Category Project" },
      });
      expect(count).toBe(0);
    });

    it("should throw error if customer does not belong to the workspace", async () => {
      const input = {
        title: "Invalid Customer Project",
        categoryId: 1,
        customerId: 2,
        status: ProjectStatus.active,
      } as any;

      await expect(createProject(input)).rejects.toThrow();
    });

    it("should fail if getSessionOrThrow fails", async () => {
      (verifySession as any).mockRejectedValue(new Error("Unauthorized"));

      const input = { title: "Should not be created" } as any;

      await expect(createProject(input)).rejects.toThrow("Unauthorized");
    });
  });

  describe("updateProject", () => {
    it("should update project data and trigger task status transitions", async () => {
      await prisma.taskCategory.create({
        data: {
          id: 1,
          name: "Category 1",
          workspaceId: 1,
        },
      });

      await prisma.task.create({
        data: {
          id: 101,
          title: "Initial Task",
          deadline: new Date("2025-12-31"),
          categoryId: 1,
          projectId: 1,
          assigneeId: "user-1",
          status: "pending",
          workspaceId: 1,
        },
      });

      const input = {
        id: 1,
        title: "Updated Title",
        status: ProjectStatus.active,
      };

      await updateProject(input);

      const updatedProject = await prisma.project.findUnique({
        where: { id: 1 },
      });

      expect(updatedProject?.title).toBe("Updated Title");
      expect(updatedProject?.status).toBe(ProjectStatus.active);

      const updatedTask = await prisma.task.findUnique({ where: { id: 101 } });
      expect(updatedTask?.status).toBe("active");
    });

    it("should throw error if project belongs to another workspace", async () => {
      const input = {
        id: 3,
        title: "Hacking title",
      };

      await expect(updateProject(input)).rejects.toThrow();
    });

    it("should successfully complete all tasks when project is set to completed", async () => {
      await prisma.taskCategory.create({
        data: {
          id: 1,
          name: "Category 1",
          workspaceId: 1,
        },
      });

      await prisma.task.createMany({
        data: [
          {
            id: 102,
            title: "Task 1",
            status: "pending",
            projectId: 1,
            categoryId: 1,
            assigneeId: "user-1",
            workspaceId: 1,
            deadline: new Date("2025-12-31"),
          },
          {
            id: 103,
            title: "Task 2",
            status: "active",
            projectId: 1,
            categoryId: 1,
            assigneeId: "user-1",
            workspaceId: 1,
            deadline: new Date("2025-12-31"),
          },
        ],
      });

      await updateProject({
        id: 1,
        status: ProjectStatus.completed,
      });

      const tasks = await prisma.task.findMany({ where: { projectId: 1 } });
      expect(tasks.every((t) => t.status === "completed")).toBe(true);
    });

    it("should fail and rollback if validateRelations fails", async () => {
      (verifySession as any).mockResolvedValue({
        user: { workspaceId: 1 },
      });

      const input = {
        id: 1,
        categoryId: 999,
      };

      await expect(updateProject(input)).rejects.toThrow();

      const project = await prisma.project.findUnique({ where: { id: 1 } });
      expect(project?.title).toBe("Website Redesign");
    });
  });

  describe("updateProjects", () => {
    beforeEach(async () => {
      await prisma.taskCategory.create({
        data: {
          id: 1,
          name: "Category 1",
          workspaceId: 1,
        },
      });

      await prisma.task.createMany({
        data: [
          {
            id: 1,
            title: "Task P1",
            deadline: new Date("2025-12-31"),
            status: TaskStatus.active,
            projectId: 1,
            categoryId: 1,
            assigneeId: "user-1",
            workspaceId: 1,
          },
          {
            id: 2,
            title: "Task P2",
            deadline: new Date("2025-12-31"),
            status: TaskStatus.active,
            projectId: 2,
            categoryId: 1,
            assigneeId: "user-1",
            workspaceId: 1,
          },
        ],
      });
    });

    it("should update multiple projects and their tasks in the current workspace", async () => {
      const projectIds = [1, 2];
      const nextStatus = ProjectStatus.completed;

      await updateProjects(projectIds, nextStatus);

      const projects = await prisma.project.findMany({
        where: { id: { in: projectIds } },
      });
      expect(projects.every((p) => p.status === nextStatus)).toBe(true);

      const tasks = await prisma.task.findMany({
        where: { projectId: { in: projectIds } },
      });
      expect(tasks).toHaveLength(2);
      expect(tasks.every((t) => t.status === TaskStatus.completed)).toBe(true);
    });

    it("should only update projects belonging to the user's workspace", async () => {
      (verifySession as any).mockResolvedValue({
        user: { workspaceId: 1 },
      });

      const projectIds = [1, 3];
      await updateProjects(projectIds, ProjectStatus.completed);

      const myProject = await prisma.project.findUnique({ where: { id: 1 } });
      expect(myProject?.status).toBe(ProjectStatus.completed);

      const foreignProject = await prisma.project.findUnique({
        where: { id: 3 },
      });
      expect(foreignProject?.status).toBe(ProjectStatus.active);
    });

    it("should handle transition to 'pending' correctly for multiple projects", async () => {
      await updateProjects([1, 2], ProjectStatus.pending);

      const tasks = await prisma.task.findMany({
        where: { projectId: { in: [1, 2] } },
      });

      expect(tasks.every((t) => t.status === TaskStatus.pending)).toBe(true);
    });
  });

  describe("deleteProjects", () => {
    it("should successfully delete multiple projects in the current workspace", async () => {
      const idsToDelete = [1, 2];

      const result = await deleteProjects(idsToDelete);

      expect(result.count).toBe(2);

      const remainingProjects = await prisma.project.findMany({
        where: { id: { in: idsToDelete } },
      });

      expect(remainingProjects).toHaveLength(0);
    });

    it("should return a count of 0 if trying to delete non-existent IDs", async () => {
      const nonExistentIds = [999, 1000];

      const result = await deleteProjects(nonExistentIds);

      expect(result).toEqual({ count: 0 });
    });

    it("should not delete projects belonging to another workspace", async () => {
      const foreignIds = [3];

      const result = await deleteProjects(foreignIds);

      expect(result.count).toBe(0);

      const foreignProject = await prisma.project.findUnique({
        where: { id: 3 },
      });

      expect(foreignProject).not.toBeNull();
    });

    it("should only delete own projects even if a mix of own and foreign IDs is provided", async () => {
      const mixedIds = [1, 3];

      const result = await deleteProjects(mixedIds);

      expect(result.count).toBe(1);

      const myProject = await prisma.project.findUnique({ where: { id: 1 } });
      expect(myProject).toBeNull();

      const foreignProject = await prisma.project.findUnique({
        where: { id: 3 },
      });
      expect(foreignProject).not.toBeNull();
    });

    it("should fail and not delete anything if authorization fails", async () => {
      (verifySession as any).mockRejectedValue(new Error("Unauthorized"));

      await expect(deleteProjects([1])).rejects.toThrow("Unauthorized");

      const project = await prisma.project.findUnique({ where: { id: 1 } });
      expect(project).not.toBeNull();
    });
  });
});
