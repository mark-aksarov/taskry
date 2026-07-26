import { members } from "@/prisma/seed/test-data";
import {
  users,
  positions,
  companies,
  organizations,
} from "@/prisma/seed/test-data";

import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { updateCompany } from "../company.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { UnauthorizedError } from "../../utils/error";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

describe("updateCompany", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions,
      users,
      companies,
    });

    await setupAuth("user-1");
  });

  afterEach(async () => {
    await prisma.company.deleteMany();
  });

  it("should successfully update a company", async () => {
    await prisma.company.create({
      data: {
        id: 3,
        name: "Company 3",
        organizationId: "org-1",
      },
    });

    const result = await updateCompany({
      id: 3,
      name: "Updated Company Name",
    });

    expect(result).not.toBeNull();
    expect(result!.id).toBe(3);
    expect(result!.name).toBe("Updated Company Name");
  });

  it("should throw an error when trying to update a company from another organization", async () => {
    await prisma.company.create({
      data: {
        id: 3,
        name: "Company 3",
        organizationId: "org-2",
      },
    });

    const updateCompanyPromise = updateCompany({
      id: 1,
      name: "Updated Company Name",
    });

    await expect(updateCompanyPromise).rejects.toThrow(
      PrismaClientKnownRequestError,
    );
    await expect(updateCompanyPromise).rejects.toMatchObject({
      code: "P2025",
    });
  });

  describe("RBAC: update company", () => {
    const setup = async (userId?: string) => {
      await setupAuth(userId);

      await prisma.company.create({
        data: {
          id: 3,
          name: "Company 3",
          organizationId: "org-1",
        },
      });

      return {
        updateInput: {
          id: 3,
          name: "Updated Company Name",
        },
      };
    };

    it("should succeed for owner", async () => {
      const { updateInput } = await setup("user-1");
      const result = await updateCompany(updateInput);
      expect(result).toBeDefined();
      expect(result!.name).toBe(updateInput.name);
    });

    it("should succeed for member", async () => {
      const { updateInput } = await setup("user-2");
      const result = await updateCompany(updateInput);
      expect(result).toBeDefined();
      expect(result!.name).toBe(updateInput.name);
    });

    it("should fail for anonymous", async () => {
      const { updateInput } = await setup();

      await expect(updateCompany(updateInput)).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });
});
