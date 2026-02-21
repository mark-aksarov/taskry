import {
  users,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/test-utils/data";

import prisma from "@/lib/prisma";
import { searchProjects } from "../project.dal";
import { seed } from "@/prisma/test-utils/seed";
import { ProjectStatus } from "@/generated/prisma/enums";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { it, expect, describe, beforeEach, beforeAll, afterEach } from "vitest";

describe("searchProjects", () => {
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
    });
  });

  afterEach(async () => {
    await prisma.project.deleteMany();
  });

  it("should return all projects with valid ProjectSearchDTO", async () => {
    await prisma.project.createMany({
      data: [
        {
          id: 1,
          workspaceId: 1,
          title: "Project A",
          deadline: new Date("2025-03-01"),
          creatorId: "user-1",
          categoryId: 1,
          customerId: 1,
          status: ProjectStatus.completed,
        },
      ],
    });

    const result = await searchProjects({
      page: 1,
      pageSize: 10,
    });

    expect(result).toStrictEqual({
      items: [
        {
          id: 1,
          title: "Project A",
          deadline: new Date("2025-03-01").toISOString(),
        },
      ],
      totalCount: 1,
    });
  });

  it("should filter projects by query", async () => {
    await prisma.project.createMany({
      data: [
        {
          id: 1,
          workspaceId: 1,
          title: "Project A",
          deadline: new Date("2025-03-01"),
          creatorId: "user-1",
          categoryId: 1,
          customerId: 1,
          status: ProjectStatus.completed,
        },
        {
          id: 2,
          workspaceId: 1,
          title: "Project B",
          deadline: new Date("2025-05-15"),
          creatorId: "user-1",
          categoryId: 2,
          customerId: 1,
          status: ProjectStatus.active,
        },
      ],
    });

    const result = await searchProjects({
      page: 1,
      pageSize: 10,
      query: "Project A",
    });

    expect(result.items).toHaveLength(1);
    expect(result.items[0].title).toBe("Project A");
  });

  describe("pagination", () => {
    beforeEach(async () => {
      await prisma.project.createMany({
        data: [
          {
            id: 1,
            workspaceId: 1,
            title: "Project 1",
            deadline: new Date("2025-03-01"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.completed,
          },
          {
            id: 2,
            workspaceId: 1,
            title: "Project 2",
            deadline: new Date("2025-05-15"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.active,
          },
          {
            id: 3,
            workspaceId: 1,
            title: "Project 3",
            deadline: new Date("2025-07-18"),
            creatorId: "user-1",
            categoryId: 1,
            customerId: 1,
            status: ProjectStatus.active,
          },
        ],
      });
    });

    it("should handle pagination correctly (page and pageSize)", async () => {
      const page1 = await searchProjects({
        page: 1,
        pageSize: 2,
      });

      const page2 = await searchProjects({
        page: 2,
        pageSize: 2,
      });

      expect(page1.items).toHaveLength(2);
      expect(page1.totalCount).toBe(3);
      expect(page1.items[0].title).toBe("Project 1");
      expect(page1.items[1].title).toBe("Project 2");

      expect(page2.items).toHaveLength(1);
      expect(page2.totalCount).toBe(3);
      expect(page2.items[0].title).toBe("Project 3");
    });

    it("should return an empty array if page exceeds available data", async () => {
      const result = await searchProjects({
        page: 99,
        pageSize: 10,
      });

      expect(result.items).toEqual([]);
      expect(result.totalCount).toBe(3);
    });
  });
});
