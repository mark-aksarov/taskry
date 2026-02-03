import prisma from "@/lib/prisma";
import { createPosition } from "../position.dal";
import { AccessDeniedError } from "../../utils/error";
import { resetDatabase } from "@/prisma/resetDatabase";
import { requireSession } from "@/lib/data/utils/requireSession";
import { vi, describe, beforeEach, beforeAll, it, expect } from "vitest";

vi.mock("server-only", () => ({}));

vi.mock("@/lib/data/utils/requireSession", () => ({
  requireSession: vi.fn(),
}));

describe("Position DAL", () => {
  beforeEach(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await prisma.position.deleteMany();
  });

  beforeAll(async () => {
    await resetDatabase();

    await prisma.workspace.createMany({ data: [{ id: 1 }, { id: 2 }] });

    await prisma.user.createMany({
      data: [
        {
          id: "user-1",
          fullName: "User 1",
          email: "user-1@test.com",
          role: "owner",
          workspaceId: 1,
        },
        {
          id: "user-2",
          fullName: "User 2",
          email: "user-2@test.com",
          role: "user",
          workspaceId: 1,
        },
        {
          id: "user-3",
          fullName: "User 3",
          email: "user-3@test.com",
          role: "guest",
          workspaceId: 1,
        },
        {
          id: "user-4",
          fullName: "User 4",
          email: "user-4@test.com",
          role: "manager",
          workspaceId: 2,
        },
      ],
    });
  });

  describe("createPosition", () => {
    it("should successfully create a position", async () => {
      const input = {
        id: 1,
        name: "Position 1",
      };

      const result = await createPosition(input);

      expect(result).toBeDefined();
      expect(result.name).toBe("Position 1");
      expect(result.workspaceId).toBe(1);
    });

    describe("RBAC: create position", () => {
      const setup = async (userId: string, role: string) => {
        (requireSession as any).mockResolvedValue({
          user: { id: userId, workspaceId: 1, role },
        });

        const createInput = {
          id: 1,
          name: "Position 1",
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
});
