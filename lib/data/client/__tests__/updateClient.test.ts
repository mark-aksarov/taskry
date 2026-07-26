import {
  users,
  members,
  companies,
  positions,
  organizations,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import {
  NotFoundError,
  AccessDeniedError,
  UnauthorizedError,
} from "../../utils/error";

import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { updateClient } from "../client.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

describe("updateClient", () => {
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

  afterEach(async () => {
    await prisma.client.deleteMany();
  });

  it("should successfully update a client", async () => {
    const clientData = {
      id: 1,
      bio: null,
      phoneNumber: null,
      publicLink: null,
      fullName: "Client 1",
      email: "client-1@test.com",
      companyId: 1,
    };

    await prisma.client.create({
      data: {
        ...clientData,
        organizationId: "org-1",
      },
    });

    const result = await updateClient({
      ...clientData,
      fullName: "Updated Client Full Name",
    });

    expect(result).not.toBeNull();
    expect(result!.id).toBe(1);
    expect(result!.fullName).toBe("Updated Client Full Name");
  });

  it("should throw NotFoundError if company does not found", async () => {
    const clientData = {
      id: 1,
      bio: null,
      phoneNumber: null,
      publicLink: null,
      fullName: "Client 1",
      email: "client-1@test.com",
      companyId: 1,
    };

    await prisma.client.create({
      data: {
        ...clientData,
        organizationId: "org-1",
      },
    });

    const updateClientPromise = updateClient({
      ...clientData,
      companyId: 999,
    });

    await expect(updateClientPromise).rejects.toThrow(NotFoundError);
    await expect(updateClientPromise).rejects.toThrow(/Company not found/i);
  });

  it("should throw AccessDeniedError if company does not belong to the organization", async () => {
    const clientData = {
      id: 1,
      bio: null,
      phoneNumber: null,
      publicLink: null,
      fullName: "Client 1",
      email: "client-1@test.com",
      companyId: 1,
    };

    await prisma.client.create({
      data: {
        ...clientData,
        organizationId: "org-1",
      },
    });

    const updateClientPromise = updateClient({
      ...clientData,
      companyId: 2,
    });

    await expect(updateClientPromise).rejects.toThrow(AccessDeniedError);
    await expect(updateClientPromise).rejects.toThrow(/Company access denied/i);
  });

  it("should throw an error when trying to update a client from another organization", async () => {
    const clientData = {
      id: 1,
      bio: null,
      phoneNumber: null,
      publicLink: null,
      fullName: "Client 1",
      email: "client-1@test.com",
      companyId: 1,
    };

    await prisma.client.create({
      data: {
        ...clientData,
        organizationId: "org-2",
      },
    });

    const updateClientPromise = updateClient({
      ...clientData,
      fullName: "Updated Client Full Name",
    });

    await expect(updateClientPromise).rejects.toThrow(
      PrismaClientKnownRequestError,
    );
    await expect(updateClientPromise).rejects.toMatchObject({
      code: "P2025",
    });
  });

  describe("RBAC: update client", () => {
    const setup = async (userId?: string) => {
      await setupAuth(userId);

      const clientData = {
        id: 1,
        bio: null,
        phoneNumber: null,
        publicLink: null,
        fullName: "Client 1",
        email: "client-1@test.com",
        companyId: 1,
      };

      await prisma.client.create({
        data: {
          ...clientData,
          organizationId: "org-1",
        },
      });

      return {
        updateInput: {
          ...clientData,
          fullName: "Updated Client Full Name",
        },
      };
    };

    it("should succeed for owner", async () => {
      const { updateInput } = await setup("user-1");
      const result = await updateClient(updateInput);
      expect(result.fullName).toBe(updateInput.fullName);
    });

    it("should succeed for member", async () => {
      const { updateInput } = await setup("user-2");
      const result = await updateClient(updateInput);
      expect(result.fullName).toBe(updateInput.fullName);
    });

    it("should fail for anonymous", async () => {
      const { updateInput } = await setup();

      await expect(updateClient(updateInput)).rejects.toThrow(
        UnauthorizedError,
      );
    });
  });
});
