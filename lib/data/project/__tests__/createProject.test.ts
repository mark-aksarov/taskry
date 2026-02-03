import {
  seedUsers,
  seedCompanies,
  seedCustomers,
  seedWorkspaces,
  seedTaskCategories,
  seedProjectCategories,
  seedPositions,
} from "@/lib/data/utils/test-utils";

import { createProject } from "../project.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { it, expect, describe, beforeAll } from "vitest";
import { ProjectStatus } from "@/generated/prisma/enums";
import { requireSession } from "@/lib/data/utils/requireSession";
import { AccessDeniedError, NotFoundError } from "../../utils/error";

describe("createProject", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();
    await seedWorkspaces();
    await seedPositions();
    await seedUsers();
    await seedProjectCategories();
    await seedTaskCategories();
    await seedCompanies();
    await seedCustomers();
  });

  it("should successfully create a project", async () => {
    const result = await createProject({
      title: "Project 1",
      description: "Description 1",
      deadline: new Date("2025-12-31"),
      status: ProjectStatus.active,
      categoryId: 1,
      customerId: 1,
    });

    expect(result).toBeDefined();
    expect(result.title).toBe(result.title);
    expect(result.workspaceId).toBe(1);
    expect(result.creatorId).toBe("user-1");
  });

  it("should throw error if project category does not found", async () => {
    const createProjectPromise = createProject({
      title: "Project 1",
      deadline: new Date("2025-12-31"),
      categoryId: 999,
      customerId: 1,
      status: ProjectStatus.active,
    });

    await expect(createProjectPromise).rejects.toThrow(NotFoundError);
    await expect(createProjectPromise).rejects.toThrow(
      /Project category not found/i,
    );
  });

  it("should throw error if customer does not found", async () => {
    const createProjectPromise = createProject({
      title: "Project 1",
      deadline: new Date("2025-12-31"),
      categoryId: 1,
      customerId: 999,
      status: ProjectStatus.active,
    });

    await expect(createProjectPromise).rejects.toThrow(NotFoundError);
    await expect(createProjectPromise).rejects.toThrow(/Customer not found/i);
  });

  it("should throw error if category does not belong to the workspace", async () => {
    const createProjectPromise = createProject({
      title: "Project 1",
      deadline: new Date("2025-12-31"),
      categoryId: 2,
      customerId: 1,
      status: ProjectStatus.active,
    });

    await expect(createProjectPromise).rejects.toThrow(AccessDeniedError);
    await expect(createProjectPromise).rejects.toThrow(
      /Project category access denied/i,
    );
  });

  it("should throw error if customer does not belong to the workspace", async () => {
    const createProjectPromise = createProject({
      title: "Project 1",
      deadline: new Date("2025-12-31"),
      categoryId: 1,
      customerId: 3,
      status: ProjectStatus.active,
    });

    await expect(createProjectPromise).rejects.toThrow(AccessDeniedError);
    await expect(createProjectPromise).rejects.toThrow(
      /Customer access denied/i,
    );
  });

  it("should create a project without optional fields", async () => {
    const result = await createProject({
      title: "Project 1",
      deadline: new Date("2025-12-31"),
      categoryId: 1,
      status: ProjectStatus.active,
    });

    expect(result.id).toBeDefined();
    expect(result.customerId).toBeNull();
  });

  describe("RBAC: create project", () => {
    const setup = async (userId: string, role: string) => {
      (requireSession as any).mockResolvedValue({
        user: { id: userId, workspaceId: 1, role },
      });

      const createInput = {
        title: "Project 1",
        deadline: new Date("2025-12-31"),
        categoryId: 1,
        customerId: 1,
        status: ProjectStatus.active,
      };

      return {
        createInput,
      };
    };

    it("should succeed for owner", async () => {
      const { createInput } = await setup("user-1", "owner");
      const result = await createProject(createInput);
      expect(result).toBeDefined();
      expect(result.title).toBe(createInput.title);
    });

    it("should succeed for user", async () => {
      const { createInput } = await setup("user-2", "user");
      const result = await createProject(createInput);
      expect(result).toBeDefined();
      expect(result.title).toBe(createInput.title);
    });

    it("should fail for guest", async () => {
      const { createInput } = await setup("user-3", "guest");
      await expect(createProject(createInput)).rejects.toThrow(
        AccessDeniedError,
      );
    });
  });
});
