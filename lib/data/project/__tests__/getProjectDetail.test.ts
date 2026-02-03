import {
  seedUsers,
  seedCustomers,
  seedCompanies,
  seedWorkspaces,
  seedTaskCategories,
  seedProjectCategories,
  seedProjects,
  seedPositions,
} from "@/lib/data/utils/test-utils";

import prisma from "@/lib/prisma";
import { getProjectDetail } from "../project.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { it, expect, describe, beforeAll } from "vitest";
import { ProjectStatus } from "@/generated/prisma/enums";
import { requireSession } from "@/lib/data/utils/requireSession";

describe("getProjectDetail", () => {
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

    await prisma.attachment.createMany({
      data: [
        {
          id: 1,
          projectId: 1,
          fileName: "Attachment 1",
          fileUrl: "https://example.com/attachment-1.jpg",
          workspaceId: 1,
        },
        {
          id: 2,
          projectId: 1,
          fileName: "Attachment 2",
          fileUrl: "https://example.com/attachment-2.jpg",
          workspaceId: 1,
        },
      ],
    });
  });

  it("should return a valid ProjectDetailDTO", async () => {
    const result = await getProjectDetail(1);

    expect(result).toStrictEqual({
      id: 1,
      title: "Project 1",
      description: "Description 1",
      deadline: new Date("2025-12-31"),
      status: ProjectStatus.active,
      categoryId: 1,
      customerId: 1,

      creator: {
        id: "user-1",
        fullName: "User 1",
        imageUrl: "https://example.com/user-1.jpg",
      },

      customer: {
        id: 1,
        fullName: "Customer 1",
      },

      category: {
        id: 1,
        name: "Project Category 1",
      },

      attachments: [
        {
          id: 1,
          fileName: "Attachment 1",
          fileUrl: "https://example.com/attachment-1.jpg",
        },
        {
          id: 2,
          fileName: "Attachment 2",
          fileUrl: "https://example.com/attachment-2.jpg",
        },
      ],
    });
  });

  it("should return null", async () => {
    const failure = await getProjectDetail(999);
    expect(failure).toBeNull();
  });
});
