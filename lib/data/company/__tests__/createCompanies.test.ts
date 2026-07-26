import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { createCompanies } from "../company.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { COMPANY_MAX_COUNT } from "../../constants";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { UnauthorizedError, LimitExceededError } from "../../utils/error";
import { users, positions, organizations } from "@/prisma/seed/test-data";

describe("createCompanies", () => {
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

  it("should successfully create companies", async () => {
    const inputData = [
      {
        name: "Company 1",
      },
      {
        name: "Company 2",
      },
    ];

    const result = await createCompanies(inputData);

    expect(result.length).toBe(2);
    expect(result).toMatchObject([
      {
        name: "Company 1",
      },
      {
        name: "Company 2",
      },
    ]);
  });

  it("should fail when creating companies exceeds the limit", async () => {
    const companies = [];

    for (let i = 1; i < COMPANY_MAX_COUNT; i++) {
      companies.push({
        organizationId: "org-1",
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
    const setup = async (userId?: string) => {
      await setupAuth(userId);

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
      const { createInput } = await setup("user-1");

      const result = await createCompanies(createInput);

      expect(result.length).toBe(2);
    });

    it("should succeed for member", async () => {
      const { createInput } = await setup("user-2");

      const result = await createCompanies(createInput);

      expect(result.length).toBe(2);
    });

    it("should fail for anonymous", async () => {
      const { createInput } = await setup();

      await expect(createCompanies(createInput)).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });
});
