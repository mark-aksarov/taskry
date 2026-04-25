import prisma from "@/lib/prisma";
import { createUser } from "../user.service";
import { seed } from "@/prisma/test-utils/seed";
import { AccessDeniedError } from "@/lib/data/utils/error";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, beforeEach } from "vitest";
import { users, positions, workspaces } from "@/prisma/test-utils/data";

describe("createUser", () => {
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

  beforeEach(async () => {
    await prisma.user.deleteMany();

    await seed({
      users,
    });
  });

  it("should successfully create a user", async () => {
    const user = await createUser({
      email: "test@test.com",
      fullName: "test",
    });

    expect(user).toBeDefined();
    expect(user.email).toBe("test@test.com");
    expect(user.name).toBe("test");
    expect(user.role).toBe("user");
  });

  describe("RBAC: create task", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      const createInput = {
        email: "test@test.com",
        fullName: "test",
      };

      return {
        createInput,
      };
    };

    it("should succeed for owner", async () => {
      const { createInput } = await setup("user-1", "owner");
      const result = await createUser(createInput);
      expect(result).toBeDefined();
      expect(result.name).toBe(createInput.fullName);
    });

    it("should succeed for user", async () => {
      const { createInput } = await setup("user-2", "user");
      await expect(createUser(createInput)).rejects.toThrow(AccessDeniedError);
    });

    it("should fail for guest", async () => {
      const { createInput } = await setup("user-3", "guest");
      await expect(createUser(createInput)).rejects.toThrow(AccessDeniedError);
    });
  });
});
