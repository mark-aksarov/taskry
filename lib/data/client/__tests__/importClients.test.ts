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
  LimitExceededError,
  UnauthorizedError,
} from "../../utils/error";

import prisma from "@/lib/prisma";

import { seed } from "@/prisma/test-seed";
import { importClients } from "../client.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { CUSTOMER_MAX_COUNT } from "../../constants";

import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("importClients", () => {
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

  it("should successfully import clients", async () => {
    const result = await importClients([
      {
        fullName: "Client 1",
        bio: "Client bio",
        email: "client-1@test.com",
        phoneNumber: "123-456-7890",
        publicLink: "https://example.com",
        companyName: "Company 1",
      },
    ]);

    expect(result).toHaveLength(1);

    expect(result[0]).toMatchObject({
      fullName: "Client 1",
      bio: "Client bio",
      email: "client-1@test.com",
      phoneNumber: "123-456-7890",
      publicLink: "https://example.com",
      companyId: 1,
    });
  });

  it("should throw NotFoundError if company does not found", async () => {
    const promise = importClients([
      {
        fullName: "Client 1",
        email: "client-1@test.com",
        companyName: "Unknown company",
      },
    ]);

    await expect(promise).rejects.toThrow(NotFoundError);

    await expect(promise).rejects.toThrow(/Companies not found/i);
  });

  it("should create clients without optional fields", async () => {
    const result = await importClients([
      {
        fullName: "Client 1",
        email: "client-1@test.com",
      },
    ]);

    expect(result).toHaveLength(1);

    expect(result[0]).toMatchObject({
      fullName: "Client 1",
      email: "client-1@test.com",
    });

    expect(result[0].companyId).toBeUndefined();
  });

  it("should fail if company belongs to another organization", async () => {
    await prisma.company.create({
      data: {
        name: "Other organization company",
        organizationId: "org-2",
      },
    });

    const promise = importClients([
      {
        fullName: "Client 1",
        email: "client-1@test.com",
        companyName: "Other organization company",
      },
    ]);

    await expect(promise).rejects.toThrow(NotFoundError);

    await expect(promise).rejects.toThrow(/Companies not found/i);
  });

  it("should fail when client limit is reached", async () => {
    const clients = Array.from({ length: CUSTOMER_MAX_COUNT }, (_, index) => ({
      fullName: `Client ${index}`,
      email: `client-${index}@test.com`,
      organizationId: "org-1",
    }));

    await prisma.client.createMany({
      data: clients,
    });

    await expect(
      importClients([
        {
          fullName: "Limit exceeded client",
          email: "limit@test.com",
        },
      ]),
    ).rejects.toThrow(LimitExceededError);

    await prisma.client.deleteMany();
  }, 30000);

  describe("RBAC: import clients", () => {
    const setup = async (userId?: string) => {
      await setupAuth(userId);

      return {
        input: [
          {
            fullName: "Client 1",
            email: "client-1@test.com",
            companyName: "Company 1",
          },
        ],
      };
    };

    it("should succeed for owner", async () => {
      const { input } = await setup("user-1");

      const result = await importClients(input);

      expect(result).toHaveLength(1);
      expect(result[0].fullName).toBe(input[0].fullName);
    });

    it("should succeed for member", async () => {
      const { input } = await setup("user-2");

      const result = await importClients(input);

      expect(result).toHaveLength(1);
      expect(result[0].fullName).toBe(input[0].fullName);
    });

    it("should fail for anonymous", async () => {
      const { input } = await setup();

      await expect(importClients(input)).rejects.toThrow(UnauthorizedError);
    });
  });
});
