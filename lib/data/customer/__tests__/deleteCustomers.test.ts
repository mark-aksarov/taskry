import {
  users,
  positions,
  companies,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import prisma from "@/lib/prisma";
import { deleteCustomers } from "../customer.dal";
import { AccessDeniedError } from "../../utils/error";
import { seed } from "@/prisma/test-seed";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";

describe("deleteCustomers", () => {
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
    await prisma.customer.deleteMany();
  });

  it("should successfully delete customers", async () => {
    await prisma.customer.createMany({
      data: [
        {
          id: 1,
          fullName: "Customer 1",
          email: "customer-1@test.com",
          companyId: 1,
          workspaceId: 1,
        },
        {
          id: 2,
          fullName: "Customer 2",
          email: "customer-2@test.com",
          companyId: 1,
          workspaceId: 1,
        },
      ],
    });

    const result = await deleteCustomers([1, 2]);
    await prisma.customer.deleteMany();

    expect(result.count).toBe(2);
    const remainingCustomers = await prisma.customer.findMany();

    expect(remainingCustomers).toHaveLength(0);
  });

  it("should not delete customers from a different workspace", async () => {
    await prisma.customer.createMany({
      data: [
        {
          id: 1,
          fullName: "Customer 1",
          email: "customer-1@test.com",
          companyId: 1,
          workspaceId: 2,
        },
      ],
    });

    const result = await deleteCustomers([1]);
    await prisma.customer.deleteMany();

    expect(result.count).toBe(0);
  });

  it("should only delete customers belonging to the current workspace", async () => {
    await prisma.customer.createMany({
      data: [
        {
          id: 1,
          fullName: "Customer 1",
          email: "customer-1@test.com",
          companyId: 1,
          workspaceId: 1,
        },
        {
          id: 2,
          fullName: "Customer 2",
          email: "customer-2@test.com",
          companyId: 2,
          workspaceId: 2,
        },
      ],
    });

    const result = await deleteCustomers([1, 2]);
    await prisma.customer.deleteMany();

    expect(result.count).toBe(1);
  });

  it("should return 0 if an empty array is provided", async () => {
    const result = await deleteCustomers([]);
    expect(result.count).toBe(0);
  });

  describe("RBAC: delete customers", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      await prisma.customer.create({
        data: {
          id: 1,
          fullName: "Customer 1",
          email: "customer-1@test.com",
          companyId: 1,
          workspaceId: 1,
        },
      });
    };

    it("should succeed for owner", async () => {
      await setup("user-1", "owner");
      const result = await deleteCustomers([1]);
      expect(result.count).toBe(1);
    });

    it("should fail for user", async () => {
      await setup("user-2", "user");
      const result = await deleteCustomers([1]);
      expect(result.count).toBe(1);
    });

    it("should fail for guest", async () => {
      await setup("user-3", "guest");
      await expect(deleteCustomers([1])).rejects.toThrow(AccessDeniedError);
    });
  });
});
