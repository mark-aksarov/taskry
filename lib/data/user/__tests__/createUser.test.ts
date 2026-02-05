import {
  seedUsers,
  seedPositions,
  seedWorkspaces,
} from "@/lib/data/utils/test-utils";

import prisma from "@/lib/prisma";
import { createUser } from "../user.service";
import { resetDatabase } from "@/prisma/resetDatabase";
import { AccessDeniedError } from "@/lib/data/utils/error";
import { requireSession } from "@/lib/data/utils/requireSession";
import { it, expect, describe, beforeAll, beforeEach } from "vitest";

describe("createUser", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();
    await seedWorkspaces();
    await seedPositions();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
    await seedUsers();
  });

  it("should successfully create a user", async () => {
    const user = await createUser({
      email: "test@test.com",
      password: "12345678",
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
        password: "12345678",
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
