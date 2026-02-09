import prisma from "@/lib/prisma";
import { getCompanySummaries } from "../company.dal";
import { seed } from "@/prisma/test-utils/seed";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, workspaces } from "@/prisma/test-utils/data";

describe("getCompanySummaries", () => {
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
    await prisma.company.deleteMany();
  });

  it("should return all companies", async () => {
    await prisma.company.createMany({
      data: [
        { id: 1, name: "Company 1", workspaceId: 1 },
        { id: 2, name: "Company 2", workspaceId: 1 },
      ],
    });

    const result = await getCompanySummaries();

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          name: "Company 1",
        },
        {
          id: 2,
          name: "Company 2",
        },
      ]),
    );
  });

  it("should return empty array", async () => {
    const result = await getCompanySummaries();
    expect(result).toHaveLength(0);
  });
});
