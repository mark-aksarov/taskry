import {
  getProjectList,
  getProjectDetail,
  getProjectSummary,
  getProjectFormData,
  getProjectSummaries,
} from "../project.service";
import prisma from "@/lib/prisma";
import { ProjectStatus } from "@/generated/prisma/enums";
import { UnauthorizedError } from "@/lib/data/utils/error";
import { resetDatabase } from "@/prisma/resetDatabase";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { verifySession } from "@/lib/data/utils/verifySession";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/verifySession", () => ({
  verifySession: vi.fn(),
}));

describe("Project Service", () => {
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

  describe("getProjectSummary", () => {
    it("should return mapped project summary", async () => {
      const result = await getProjectSummary(1);

      expect(verifySession).toHaveBeenCalledTimes(1);
      expect(result).toMatchObject({
        id: 1,
        title: "Website Redesign",
      });
    });

    it("should return null if project exists but belongs to a different workspace", async () => {
      const result = await getProjectSummary(3);
      expect(result).toBeNull();
    });

    it("should return null if project does not exist at all", async () => {
      const result = await getProjectSummary(5);
      expect(result).toBeNull();
    });

    it("should throw authorization error if verifySession fails", async () => {
      (verifySession as any).mockRejectedValue(new UnauthorizedError());

      await expect(getProjectSummary(1)).rejects.toThrow("Unauthorized");
    });
  });

  describe("getProjectSummaries", () => {
    it("should return all projects for the current workspace", async () => {
      const result = await getProjectSummaries();

      expect(result).toHaveLength(2);
      expect(result).toContainEqual(
        expect.objectContaining({ title: "Website Redesign" }),
      );
      expect(result).toContainEqual(
        expect.objectContaining({ title: "Internal Dashboard" }),
      );
    });

    it("should return an empty array if workspace has no projects", async () => {
      (verifySession as any).mockResolvedValue({
        user: { workspaceId: 3 },
      });

      const result = await getProjectSummaries();

      expect(result).toHaveLength(0);
    });
  });

  describe("getProjectFormData", () => {
    it("should return project data for form with correct mapping", async () => {
      const result = await getProjectFormData(1);

      expect(result).toBeDefined();
      expect(result?.title).toBe("Website Redesign");
    });

    it("should return null if user tries to access project from another workspace", async () => {
      (verifySession as any).mockResolvedValue({
        user: { workspaceId: 2 },
      });

      const result = await getProjectFormData(1);
      expect(result).toBeNull();
    });

    it("should return null if id does not exist", async () => {
      const result = await getProjectFormData(100);
      expect(result).toBeNull();
    });
  });

  describe("getProjectDetail", () => {
    it("should return detailed project info with all relations", async () => {
      const result = await getProjectDetail(1);

      expect(result).toBeDefined();
      expect(result).toMatchObject({
        id: 1,
        title: "Website Redesign",
        category: {
          id: 1,
          name: "Development",
        },
        customer: {
          id: 1,
          fullName: "John Customer",
        },
        creator: {
          id: "user-1",
          fullName: "Alice Johnson",
        },
      });
    });

    it("should return null if workspaceId mismatch (security check)", async () => {
      (verifySession as any).mockResolvedValue({
        user: { workspaceId: 2 },
      });

      const result = await getProjectDetail(1);
      expect(result).toBeNull();
    });

    it("should return null if the project ID does not exist", async () => {
      const result = await getProjectDetail(100);
      expect(result).toBeNull();
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
      (verifySession as any).mockResolvedValue({
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
});
