import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { loginAs } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { exportTaskCategories } from "../taskCategory.dal";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, organizations } from "@/prisma/seed/test-data";

describe("exportTaskCategories", () => {
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
    await prisma.taskCategory.deleteMany();
  });

  it("should return all task category summaries as a list of valid TaskCategoryCsvDTOs", async () => {
    await prisma.taskCategory.createMany({
      data: [
        { id: 1, name: "Task Category 1", organizationId: "org-1" },
        { id: 2, name: "Task Category 2", organizationId: "org-1" },
      ],
    });

    const result = await exportTaskCategories();

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          name: "Task Category 1",
        },
        {
          name: "Task Category 2",
        },
      ]),
    );
  });

  it("should return empty array", async () => {
    const result = await exportTaskCategories();
    expect(result).toHaveLength(0);
  });
});
