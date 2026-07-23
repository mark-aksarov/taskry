import {
  users,
  positions,
  companies,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import {
  NotFoundError,
  AccessDeniedError,
  LimitExceededError,
} from "../../utils/error";

import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { createClients } from "../client.dal";
import { CUSTOMER_MAX_COUNT } from "../../constants";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("createClients", () => {
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

  it("should successfully create clients", async () => {
    const inputData = [
      {
        fullName: "Client 1",
        bio: "Client 1 bio",
        email: "client-1@test.com",
        phoneNumber: "123-456-7890",
        publicLink: "https://example.com/public-link",
        companyId: 1,
      },
    ];

    const result = await createClients(inputData);

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject(inputData[0]);
  });

  it("should throw NotFoundError if company does not found", async () => {
    const createClientsPromise = createClients([
      {
        fullName: "Client 1",
        email: "client-1@test.com",
        companyId: 999,
      },
    ]);

    await expect(createClientsPromise).rejects.toThrow(NotFoundError);
    await expect(createClientsPromise).rejects.toThrow(/Company not found/i);
  });

  it("should throw AccessDeniedError if company does not belong to the workspace", async () => {
    const createClientsPromise = createClients([
      {
        fullName: "Client 1",
        email: "client-1@test.com",
        companyId: 2,
      },
    ]);

    await expect(createClientsPromise).rejects.toThrow(AccessDeniedError);
    await expect(createClientsPromise).rejects.toThrow(
      /Company access denied/i,
    );
  });

  it("should create clients without optional fields", async () => {
    const result = await createClients([
      {
        fullName: "Client 1",
        email: "client-1@test.com",
      },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].fullName).toBe("Client 1");
  });

  it("should fail when client limit is reached", async () => {
    const clients = [];

    for (let i = 1; i <= CUSTOMER_MAX_COUNT; i++) {
      clients.push({
        fullName: `Client ${i}`,
        email: `client-${i}@test.com`,
        workspaceId: 1,
      });
    }

    await prisma.client.createMany({
      data: clients,
    });

    await expect(createClients(clients)).rejects.toThrow(
      LimitExceededError,
    );

    await prisma.client.deleteMany();
  });

  describe("RBAC: create clients", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      const createInput = [
        {
          fullName: "Client 1",
          email: "client-1@test.com",
          companyId: 1,
        },
      ];

      return {
        createInput,
      };
    };

    it("should succeed for owner", async () => {
      const { createInput } = await setup("user-1", "owner");

      const result = await createClients(createInput);

      expect(result).toHaveLength(1);
      expect(result[0].fullName).toBe(createInput[0].fullName);
    });

    it("should succeed for user", async () => {
      const { createInput } = await setup("user-2", "user");

      const result = await createClients(createInput);

      expect(result).toHaveLength(1);
      expect(result[0].fullName).toBe(createInput[0].fullName);
    });

    it("should fail for guest", async () => {
      const { createInput } = await setup("user-3", "guest");

      await expect(createClients(createInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
