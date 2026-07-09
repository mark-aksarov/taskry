import {
  users,
  positions,
  companies,
  workspaces,
} from "@/prisma/seed/test-data";

import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { updateCompany } from "../company.dal";
import { AccessDeniedError } from "../../utils/error";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

describe("updateCompany", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await seed({
      workspaces,
      positions,
      users,
      companies,
    });
  });

  afterEach(async () => {
    await prisma.company.deleteMany();
  });

  it("should successfully update a company", async () => {
    await prisma.company.create({
      data: {
        id: 3,
        name: "Company 3",
        workspaceId: 1,
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

  it("should throw an error when trying to update a company from another workspace", async () => {
    await prisma.company.create({
      data: {
        id: 3,
        name: "Company 3",
        workspaceId: 2,
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
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      await prisma.company.create({
        data: {
          id: 3,
          name: "Company 3",
          workspaceId: 1,
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
      const { updateInput } = await setup("user-1", "owner");
      const result = await updateCompany(updateInput);
      expect(result).toBeDefined();
      expect(result!.name).toBe(updateInput.name);
    });

    it("should succeed for user", async () => {
      const { updateInput } = await setup("user-2", "user");
      const result = await updateCompany(updateInput);
      expect(result).toBeDefined();
      expect(result!.name).toBe(updateInput.name);
    });

    it("should fail for guest", async () => {
      const { updateInput } = await setup("user-3", "guest");

      await expect(updateCompany(updateInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
