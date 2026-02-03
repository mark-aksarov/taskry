import {
  seedUsers,
  seedPositions,
  seedWorkspaces,
} from "@/lib/data/utils/test-utils";
import { createCompany } from "../company.dal";
import { AccessDeniedError } from "../../utils/error";
import { resetDatabase } from "@/prisma/resetDatabase";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";

describe("createCompany", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();
    await seedWorkspaces();
    await seedPositions();
    await seedUsers();
  });

  it("should successfully create a company", async () => {
    const input = {
      id: 1,
      name: "Company 1",
    };

    const result = await createCompany(input);

    expect(result).toBeDefined();
    expect(result.name).toBe("Company 1");
    expect(result.workspaceId).toBe(1);
  });

  describe("RBAC: create company", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      const createInput = {
        id: 1,
        name: "Company 1",
      };

      return {
        createInput,
      };
    };

    it("should succeed for owner", async () => {
      const { createInput } = await setup("user-1", "owner");
      const result = await createCompany(createInput);
      expect(result).toBeDefined();
      expect(result.name).toBe(createInput.name);
    });

    it("should succeed for user", async () => {
      const { createInput } = await setup("user-2", "user");
      const result = await createCompany(createInput);
      expect(result).toBeDefined();
      expect(result.name).toBe(createInput.name);
    });

    it("should fail for guest", async () => {
      const { createInput } = await setup("user-3", "guest");
      await expect(createCompany(createInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
