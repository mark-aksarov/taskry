import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { updatePosition } from "../position.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { UnauthorizedError } from "../../utils/error";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { users, positions, organizations } from "@/prisma/seed/test-data";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

describe("updatePosition", () => {
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

  afterEach(async () => {
    await prisma.position.deleteMany();
  });

  it("should successfully update a position", async () => {
    await prisma.position.create({
      data: {
        id: 3,
        name: "Position 3",
        organizationId: "org-1",
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

  it("should throw an error when trying to update a position from another organization", async () => {
    await prisma.position.create({
      data: {
        id: 3,
        name: "Position 3",
        organizationId: "org-2",
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
    const setup = async (userId?: string) => {
      await setupAuth(userId);

      await prisma.position.create({
        data: {
          id: 3,
          name: "Position 3",
          organizationId: "org-1",
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
      const { updateInput } = await setup("user-1");
      const result = await updatePosition(updateInput);
      expect(result).toBeDefined();
      expect(result!.name).toBe(updateInput.name);
    });

    it("should succeed for member", async () => {
      const { updateInput } = await setup("user-2");
      const result = await updatePosition(updateInput);
      expect(result).toBeDefined();
      expect(result!.name).toBe(updateInput.name);
    });

    it("should fail for anonymous", async () => {
      const { updateInput } = await setup();

      await expect(updatePosition(updateInput)).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });
});
