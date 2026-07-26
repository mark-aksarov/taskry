import {
  users,
  members,
  positions,
  companies,
  organizations,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import {
  NotFoundError,
  AccessDeniedError,
  LimitExceededError,
  UnauthorizedError,
} from "../../utils/error";

import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { createClients } from "../client.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { CUSTOMER_MAX_COUNT } from "../../constants";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("createClients", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions,
      users,
      companies,
      taskCategories,
      projectCategories,
    });

    await setupAuth("user-1");
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

  it("should throw AccessDeniedError if company does not belong to the organization", async () => {
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
        organizationId: "org-1",
      });
    }

    await prisma.client.createMany({
      data: clients,
    });

    await expect(createClients(clients)).rejects.toThrow(LimitExceededError);

    await prisma.client.deleteMany();
  });

  describe("RBAC: create clients", () => {
    const setup = async (userId?: string) => {
      await setupAuth(userId);

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
      const { createInput } = await setup("user-1");

      const result = await createClients(createInput);

      expect(result).toHaveLength(1);
      expect(result[0].fullName).toBe(createInput[0].fullName);
    });

    it("should succeed for member", async () => {
      const { createInput } = await setup("user-2");

      const result = await createClients(createInput);

      expect(result).toHaveLength(1);
      expect(result[0].fullName).toBe(createInput[0].fullName);
    });

    it("should fail for anonymous", async () => {
      const { createInput } = await setup();

      await expect(createClients(createInput)).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });
});
