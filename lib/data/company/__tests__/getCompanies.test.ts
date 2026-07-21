import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { getCompanies } from "../company.dal";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { requireSession } from "@/lib/data/utils/requireSession";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, workspaces } from "@/prisma/seed/test-data";

describe("getCompanies", () => {
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

    const result = await getCompanies();

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
    const result = await getCompanies();
    expect(result).toHaveLength(0);
  });
});
