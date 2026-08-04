import {
  users,
  members,
  positions,
  organizations,
} from "@/prisma/seed/test-data";

import {
  ValidationError,
  AccessDeniedError,
  UnauthorizedError,
} from "../../utils/error";

import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { setupAuth } from "@/lib/test-utils/auth";
import { seedDemoData } from "../demoData.dal";
import { beforeAll, describe, expect, it } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("seedDemoData", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions,
      users,
    });
  });

  it("should successfully seed demo data in english", async () => {
    await setupAuth("user-1");

    await seedDemoData("en");

    const companies = await prisma.company.count();
    const projects = await prisma.project.count();
    const tasks = await prisma.task.count();
    const clients = await prisma.client.count();

    expect(companies).toBeGreaterThan(0);
    expect(projects).toBeGreaterThan(0);
    expect(tasks).toBeGreaterThan(0);
    expect(clients).toBeGreaterThan(0);
  });

  it("should successfully seed demo data in russian", async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions,
      users,
    });

    await setupAuth("user-1");

    await seedDemoData("ru");

    const projects = await prisma.project.count();

    expect(projects).toBeGreaterThan(0);
  });

  it("should fail when workspace is not empty", async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions,
      users,
    });

    await setupAuth("user-1");

    await prisma.company.create({
      data: {
        organizationId: "org-1",
        name: "Existing company",
      },
    });

    await expect(seedDemoData("en")).rejects.toThrow(ValidationError);
  });

  describe("RBAC: seed demo data", () => {
    const setup = async (userId?: string) => {
      await resetDatabase();

      await seed({
        organizations,
        members,
        positions,
        users,
      });

      await setupAuth(userId);
    };

    it("should succeed for owner", async () => {
      await setup("user-1");

      await expect(seedDemoData("en")).resolves.not.toThrow();

      const projects = await prisma.project.count();

      expect(projects).toBeGreaterThan(0);
    });

    it("should fail for member without permission", async () => {
      await setup("user-2");

      await expect(seedDemoData("en")).rejects.toThrow(AccessDeniedError);
    });

    it("should fail for anonymous", async () => {
      await setup();

      await expect(seedDemoData("en")).rejects.toThrow(UnauthorizedError);
    });
  });
});
