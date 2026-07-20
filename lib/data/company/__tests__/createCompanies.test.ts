import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { createCompanies } from "../company.dal";
import { COMPANY_MAX_COUNT } from "../../constants";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { requireSession } from "@/lib/data/utils/requireSession";
import { users, positions, workspaces } from "@/prisma/seed/test-data";
import { AccessDeniedError, LimitExceededError } from "../../utils/error";

describe("createCompanies", () => {
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

  it("should successfully create companies", async () => {
    const input = [
      {
        name: "Company 1",
      },
      {
        name: "Company 2",
      },
    ];

    const result = await createCompanies(input);

    expect(result).toBeDefined();
    expect(result.count).toBe(2);

    const companies = await prisma.company.findMany({
      where: {
        workspaceId: 1,
      },
      orderBy: {
        name: "asc",
      },
    });

    expect(companies).toHaveLength(2);
    expect(companies[0].name).toBe("Company 1");
    expect(companies[1].name).toBe("Company 2");
  });

  it("should fail when creating companies exceeds the limit", async () => {
    const companies = [];

    for (let i = 1; i < COMPANY_MAX_COUNT; i++) {
      companies.push({
        workspaceId: 1,
        name: `Company ${i}`,
      });
    }

    await prisma.company.createMany({
      data: companies,
    });

    await expect(
      createCompanies([
        {
          name: "New Company",
        },
      ]),
    ).rejects.toThrow(LimitExceededError);

    await prisma.company.deleteMany();
  });

  describe("RBAC: create companies", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      const createInput = [
        {
          name: "Company 1",
        },
        {
          name: "Company 2",
        },
      ];

      return {
        createInput,
      };
    };

    it("should succeed for owner", async () => {
      const { createInput } = await setup("user-1", "owner");

      const result = await createCompanies(createInput);

      expect(result).toBeDefined();
      expect(result.count).toBe(2);
    });

    it("should succeed for user", async () => {
      const { createInput } = await setup("user-2", "user");

      const result = await createCompanies(createInput);

      expect(result).toBeDefined();
      expect(result.count).toBe(2);
    });

    it("should fail for guest", async () => {
      const { createInput } = await setup("user-3", "guest");

      await expect(createCompanies(createInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
