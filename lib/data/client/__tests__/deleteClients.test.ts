import {
  users,
  positions,
  companies,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import prisma from "@/lib/prisma";
import { deleteClients } from "../client.dal";
import { AccessDeniedError } from "../../utils/error";
import { seed } from "@/prisma/test-seed";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";

describe("deleteClients", () => {
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
      taskCategories,
      projectCategories,
    });
  });

  afterEach(async () => {
    await prisma.client.deleteMany();
  });

  it("should successfully delete clients", async () => {
    await prisma.client.createMany({
      data: [
        {
          id: 1,
          fullName: "Client 1",
          email: "client-1@test.com",
          companyId: 1,
          workspaceId: 1,
        },
        {
          id: 2,
          fullName: "Client 2",
          email: "client-2@test.com",
          companyId: 1,
          workspaceId: 1,
        },
      ],
    });

    const result = await deleteClients([1, 2]);
    await prisma.client.deleteMany();

    expect(result.count).toBe(2);
    const remainingClients = await prisma.client.findMany();

    expect(remainingClients).toHaveLength(0);
  });

  it("should not delete clients from a different workspace", async () => {
    await prisma.client.createMany({
      data: [
        {
          id: 1,
          fullName: "Client 1",
          email: "client-1@test.com",
          companyId: 1,
          workspaceId: 2,
        },
      ],
    });

    const result = await deleteClients([1]);
    await prisma.client.deleteMany();

    expect(result.count).toBe(0);
  });

  it("should only delete clients belonging to the current workspace", async () => {
    await prisma.client.createMany({
      data: [
        {
          id: 1,
          fullName: "Client 1",
          email: "client-1@test.com",
          companyId: 1,
          workspaceId: 1,
        },
        {
          id: 2,
          fullName: "Client 2",
          email: "client-2@test.com",
          companyId: 2,
          workspaceId: 2,
        },
      ],
    });

    const result = await deleteClients([1, 2]);
    await prisma.client.deleteMany();

    expect(result.count).toBe(1);
  });

  it("should return 0 if an empty array is provided", async () => {
    const result = await deleteClients([]);
    expect(result.count).toBe(0);
  });

  describe("RBAC: delete clients", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      await prisma.client.create({
        data: {
          id: 1,
          fullName: "Client 1",
          email: "client-1@test.com",
          companyId: 1,
          workspaceId: 1,
        },
      });
    };

    it("should succeed for owner", async () => {
      await setup("user-1", "owner");
      const result = await deleteClients([1]);
      expect(result.count).toBe(1);
    });

    it("should fail for user", async () => {
      await setup("user-2", "user");
      const result = await deleteClients([1]);
      expect(result.count).toBe(1);
    });

    it("should fail for guest", async () => {
      await setup("user-3", "guest");
      await expect(deleteClients([1])).rejects.toThrow(AccessDeniedError);
    });
  });
});
