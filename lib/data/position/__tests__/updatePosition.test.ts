import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { updatePosition } from "../position.dal";
import { AccessDeniedError } from "../../utils/error";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, workspaces } from "@/prisma/seed/test-data";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

describe("updatePosition", () => {
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

  afterEach(async () => {
    await prisma.position.deleteMany();
  });

  it("should successfully update a position", async () => {
    await prisma.position.create({
      data: {
        id: 3,
        name: "Position 3",
        workspaceId: 1,
      },
    });

    const result = await updatePosition({
      id: 3,
      name: "Updated Position Name",
    });

    expect(result).not.toBeNull();
    expect(result!.id).toBe(3);
    expect(result!.name).toBe("Updated Position Name");
  });

  it("should throw an error when trying to update a position from another workspace", async () => {
    await prisma.position.create({
      data: {
        id: 3,
        name: "Position 3",
        workspaceId: 2,
      },
    });

    const updatePositionPromise = updatePosition({
      id: 1,
      name: "Updated Position Name",
    });

    await expect(updatePositionPromise).rejects.toThrow(
      PrismaClientKnownRequestError,
    );
    await expect(updatePositionPromise).rejects.toMatchObject({
      code: "P2025",
    });
  });

  describe("RBAC: update position", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      await prisma.position.create({
        data: {
          id: 3,
          name: "Position 3",
          workspaceId: 1,
        },
      });

      return {
        updateInput: {
          id: 3,
          name: "Updated Position Name",
        },
      };
    };

    it("should succeed for owner", async () => {
      const { updateInput } = await setup("user-1", "owner");
      const result = await updatePosition(updateInput);
      expect(result).toBeDefined();
      expect(result!.name).toBe(updateInput.name);
    });

    it("should succeed for user", async () => {
      const { updateInput } = await setup("user-2", "user");
      const result = await updatePosition(updateInput);
      expect(result).toBeDefined();
      expect(result!.name).toBe(updateInput.name);
    });

    it("should fail for guest", async () => {
      const { updateInput } = await setup("user-3", "guest");

      await expect(updatePosition(updateInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
