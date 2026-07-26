import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { loginAs } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { getProjectCategories } from "../projectCategory.dal";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, organizations } from "@/prisma/seed/test-data";

describe("getProjectCategories", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions,
      users,
    });

    await loginAs("user-1");
  });

  afterEach(async () => {
    await prisma.projectCategory.deleteMany();
  });

  it("should return all project categories as a list of valid ProjectCategoryDTOs", async () => {
    await prisma.projectCategory.createMany({
      data: [
        { id: 1, name: "Project Category 1", organizationId: "org-1" },
        { id: 2, name: "Project Category 2", organizationId: "org-1" },
      ],
    });

    const result = await getProjectCategories();

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          name: "Project Category 1",
        },
        {
          id: 2,
          name: "Project Category 2",
        },
      ]),
    );
  });

  it("should return empty array", async () => {
    const result = await getProjectCategories();
    expect(result).toHaveLength(0);
  });
});
