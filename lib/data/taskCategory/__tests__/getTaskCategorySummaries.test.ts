import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { getTaskCategorySummaries } from "../taskCategory.dal";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, workspaces } from "@/prisma/seed/test-data";

describe("getTaskCategorySummaries", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await seed({
      workspaces,
      positions,
      users,
    });
  });

  afterEach(async () => {
    await prisma.taskCategory.deleteMany();
  });

  it("should return all task category summaries as a list of valid TaskCategorySummaryDTOs", async () => {
    await prisma.taskCategory.createMany({
      data: [
        { id: 1, name: "Task Category 1", workspaceId: 1 },
        { id: 2, name: "Task Category 2", workspaceId: 1 },
      ],
    });

    const result = await getTaskCategorySummaries();

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          name: "Task Category 1",
        },
        {
          id: 2,
          name: "Task Category 2",
        },
      ]),
    );
  });

  it("should return empty array", async () => {
    const result = await getTaskCategorySummaries();
    expect(result).toHaveLength(0);
  });
});
