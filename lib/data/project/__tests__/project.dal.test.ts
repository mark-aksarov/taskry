import {
  updateProject,
  createProject,
  deleteProjects,
  getProjectList,
  getProjectCount,
  getProjectDetail,
  getProjectSummary,
  getProjectFormData,
  getProjectSummaries,
  updateProjectStatuses,
} from "../project.dal";
import prisma from "@/lib/prisma";
import * as mappers from "../project.mapper";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { getSessionOrThrow } from "@/lib/data/utils/getSessionOrThrow";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/getSessionOrThrow", () => ({
  getSessionOrThrow: vi.fn(),
}));

describe("Project DAL", () => {
  beforeEach(async () => {
    const mockSession = {
      user: { id: "user-1", workspaceId: 1 },
    };
    (getSessionOrThrow as any).mockResolvedValue(mockSession);

    await prisma.task.deleteMany({});
    await prisma.taskCategory.deleteMany({});
    await prisma.project.deleteMany({});
    await prisma.projectCategory.deleteMany({});
    await prisma.customer.deleteMany({});
    await prisma.company.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.workspace.deleteMany({});

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

  describe("getProjectSummary", () => {
    it("should return mapped project summary", async () => {
      const mapperSpy = vi.spyOn(mappers, "mapProjectSummaryToDTO");

      await getProjectSummary(1);

      expect(getSessionOrThrow).toHaveBeenCalledTimes(1);
      expect(mapperSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          title: "Website Redesign",
        }),
      );
    });

    it("should throw 'Project not found' if project exists but belongs to a different workspace", async () => {
      await expect(getProjectSummary(3)).rejects.toThrow("Project not found");
    });

    it("should throw 'Project not found' if project does not exist at all", async () => {
      await expect(getProjectSummary(5)).rejects.toThrow("Project not found");
    });

    it("should throw authorization error if getSessionOrThrow fails", async () => {
      (getSessionOrThrow as any).mockRejectedValue(new Error("Unauthorized"));

      await expect(getProjectSummary(1)).rejects.toThrow("Unauthorized");
    });
  });

  describe("getProjectSummaries", () => {
    it("should return all projects for the current workspace", async () => {
      const mapperSpy = vi.spyOn(mappers, "mapProjectSummaryToDTO");

      const result = await getProjectSummaries();

      expect(result).toHaveLength(2);
      expect(mapperSpy).toHaveBeenCalledTimes(2);
      expect(result).toContainEqual(
        expect.objectContaining({ title: "Website Redesign" }),
      );
      expect(result).toContainEqual(
        expect.objectContaining({ title: "Internal Dashboard" }),
      );
    });

    it("should return an empty array if workspace has no projects", async () => {
      (getSessionOrThrow as any).mockResolvedValue({
        user: { workspaceId: 3 },
      });

      const result = await getProjectSummaries();

      expect(result).toHaveLength(0);
    });
  });

  describe("getProjectFormData", () => {
    it("should return project data for form with correct mapping", async () => {
      const formDataMapperSpy = vi.spyOn(mappers, "mapProjectFormDataToDTO");

      const result = await getProjectFormData(1);

      expect(result).toBeDefined();
      expect(formDataMapperSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          title: "Website Redesign",
        }),
      );
    });

    it("should throw 'Project not found' if user tries to access project from another workspace", async () => {
      (getSessionOrThrow as any).mockResolvedValue({
        user: { workspaceId: 2 },
      });

      await expect(getProjectFormData(1)).rejects.toThrow("Project not found");
    });

    it("should throw 'Project not found' if id does not exist", async () => {
      await expect(getProjectFormData(100)).rejects.toThrow(
        "Project not found",
      );
    });
  });

  describe("getProjectDetail", () => {
    it("should return detailed project info with all relations", async () => {
      const detailMapperSpy = vi.spyOn(mappers, "mapProjectDetailToDTO");

      const result = await getProjectDetail(1);

      expect(result).toBeDefined();

      expect(detailMapperSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          title: "Website Redesign",
          category: expect.objectContaining({ name: "Development" }),
          customer: expect.objectContaining({ fullName: "John Customer" }),
          creator: expect.objectContaining({ fullName: "Alice Johnson" }),
        }),
      );
    });

    it("should throw 'Project not found' if workspaceId mismatch (security check)", async () => {
      (getSessionOrThrow as any).mockResolvedValue({
        user: { workspaceId: 2 },
      });

      await expect(getProjectDetail(1)).rejects.toThrow("Project not found");
    });

    it("should throw 'Project not found' if the project ID does not exist", async () => {
      await expect(getProjectDetail(100)).rejects.toThrow("Project not found");
    });
  });

  describe("getProjectList", () => {
    it("should return projects only for the current workspace", async () => {
      const result = await getProjectList({
        page: 1,
        pageSize: 10,
        sort: "title",
      });

      expect(result).toHaveLength(2);
      expect(result[0].title).toBe("Internal Dashboard");
      expect(result[1].title).toBe("Website Redesign");
    });

    it("should handle pagination correctly (page and pageSize)", async () => {
      const result = await getProjectList({
        page: 2,
        pageSize: 1,
        sort: "title",
      });

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Website Redesign");
    });

    it("should apply filters correctly (e.g., status filter)", async () => {
      (getSessionOrThrow as any).mockResolvedValue({
        user: { workspaceId: 2 },
      });

      const result = await getProjectList({
        page: 1,
        pageSize: 10,
        sort: "title",
        filters: {
          category: [],
          customer: [],
          user: [],
          status: [ProjectStatus.completed],
        },
      });

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Brand Strategy");
    });

    it("should sort projects by deadline in ascending order", async () => {
      const result = await getProjectList({
        page: 1,
        pageSize: 10,
        sort: "deadline",
      });

      expect(result[0].title).toBe("Website Redesign");
      expect(result[1].title).toBe("Internal Dashboard");
    });

    it("should return an empty array if no projects match filters", async () => {
      const result = await getProjectList({
        page: 1,
        pageSize: 10,
        sort: "title",
        filters: {
          category: [999],
          customer: [],
          user: [],
          status: [],
        },
      });

      expect(result).toEqual([]);
    });
  });

  describe("getProjectCount", () => {
    it("should return total count of projects for the current workspace", async () => {
      const count = await getProjectCount();

      expect(count).toBe(2);
    });

    it("should return total count of projects for workspace 2", async () => {
      (getSessionOrThrow as any).mockResolvedValue({
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
      (getSessionOrThrow as any).mockResolvedValue({
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
      (getSessionOrThrow as any).mockRejectedValue(new Error("Unauthorized"));

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
      (getSessionOrThrow as any).mockResolvedValue({
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

  describe("updateProjectStatuses", () => {
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

      await updateProjectStatuses(projectIds, nextStatus);

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
      (getSessionOrThrow as any).mockResolvedValue({
        user: { workspaceId: 1 },
      });

      const projectIds = [1, 3];
      await updateProjectStatuses(projectIds, ProjectStatus.completed);

      const myProject = await prisma.project.findUnique({ where: { id: 1 } });
      expect(myProject?.status).toBe(ProjectStatus.completed);

      const foreignProject = await prisma.project.findUnique({
        where: { id: 3 },
      });
      expect(foreignProject?.status).toBe(ProjectStatus.active);
    });

    it("should handle transition to 'pending' correctly for multiple projects", async () => {
      await updateProjectStatuses([1, 2], ProjectStatus.pending);

      const tasks = await prisma.task.findMany({
        where: { projectId: { in: [1, 2] } },
      });

      expect(tasks.every((t) => t.status === TaskStatus.pending)).toBe(true);
    });

    it("should return the list of IDs passed to it", async () => {
      (getSessionOrThrow as any).mockResolvedValue({
        user: { workspaceId: 1 },
      });

      const ids = [1, 2];
      const result = await updateProjectStatuses(ids, ProjectStatus.active);

      expect(result).toEqual(ids);
    });
  });

  describe("deleteProjects", () => {
    it("should successfully delete multiple projects in the current workspace", async () => {
      const idsToDelete = [1, 2];
      const deletedCount = await deleteProjects(idsToDelete);
      expect(deletedCount).toBe(2);

      const remainingProjects = await prisma.project.findMany({
        where: { id: { in: idsToDelete } },
      });
      expect(remainingProjects).toHaveLength(0);
    });

    it("should throw 'No projects deleted' if trying to delete non-existent IDs", async () => {
      const nonExistentIds = [999, 1000];

      await expect(deleteProjects(nonExistentIds)).rejects.toThrow(
        "No projects deleted.",
      );
    });

    it("should not delete projects belonging to another workspace", async () => {
      const foreignIds = [3];

      await expect(deleteProjects(foreignIds)).rejects.toThrow(
        "No projects deleted.",
      );

      const foreignProject = await prisma.project.findUnique({
        where: { id: 3 },
      });
      expect(foreignProject).toBeDefined();
    });

    it("should only delete own projects even if a mix of own and foreign IDs is provided", async () => {
      const mixedIds = [1, 3];

      const deletedCount = await deleteProjects(mixedIds);
      expect(deletedCount).toBe(1);

      const myProject = await prisma.project.findUnique({ where: { id: 1 } });
      expect(myProject).toBeNull();

      const foreignProject = await prisma.project.findUnique({
        where: { id: 3 },
      });
      expect(foreignProject).not.toBeNull();
    });

    it("should fail and not delete anything if authorization fails", async () => {
      (getSessionOrThrow as any).mockRejectedValue(new Error("Unauthorized"));

      await expect(deleteProjects([1])).rejects.toThrow("Unauthorized");

      const project = await prisma.project.findUnique({ where: { id: 1 } });
      expect(project).not.toBeNull();
    });
  });
});
