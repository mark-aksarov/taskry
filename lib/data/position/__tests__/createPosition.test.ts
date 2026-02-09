import { createPosition } from "../position.dal";
import { seed } from "@/prisma/test-utils/seed";
import { AccessDeniedError } from "../../utils/error";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { users, positions, workspaces } from "@/prisma/test-utils/data";

describe("createPosition", () => {
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

  it("should successfully create a position", async () => {
    const input = {
      name: "Position 3",
    };

    const result = await createPosition(input);

    expect(result).toBeDefined();
    expect(result.name).toBe("Position 3");
    expect(result.workspaceId).toBe(1);
  });

  describe("RBAC: create position", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      const createInput = {
        name: "Position 3",
      };

      return {
        createInput,
      };
    };

    it("should succeed for owner", async () => {
      const { createInput } = await setup("user-1", "owner");
      const result = await createPosition(createInput);
      expect(result).toBeDefined();
      expect(result.name).toBe(createInput.name);
    });

    it("should succeed for user", async () => {
      const { createInput } = await setup("user-2", "user");
      const result = await createPosition(createInput);
      expect(result).toBeDefined();
      expect(result.name).toBe(createInput.name);
    });

    it("should fail for guest", async () => {
      const { createInput } = await setup("user-3", "guest");
      await expect(createPosition(createInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
