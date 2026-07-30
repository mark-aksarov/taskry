import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { exportCompanies } from "../company.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, organizations } from "@/prisma/seed/test-data";

describe("exportCompanies", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions,
      users,
    });

    await setupAuth("user-1");
  });

  afterEach(async () => {
    await prisma.company.deleteMany();
  });

  it("should return all companies as a list of valid CompanyCsvDTOs", async () => {
    await prisma.company.createMany({
      data: [
        { id: 1, name: "Company 1", organizationId: "org-1" },
        { id: 2, name: "Company 2", organizationId: "org-1" },
      ],
    });

    const result = await exportCompanies();

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          name: "Company 1",
        },
        {
          name: "Company 2",
        },
      ]),
    );
  });

  it("should return empty array", async () => {
    const result = await exportCompanies();
    expect(result).toHaveLength(0);
  });
});
