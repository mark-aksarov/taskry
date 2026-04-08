import {
  users,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
  projects,
  tasks,
} from "@/prisma/test-utils/data";

import { getTaskFormData } from "../task.dal";
import { seed } from "@/prisma/test-utils/seed";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

describe("getTaskFormData", () => {
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
      customers,
      taskCategories,
      projectCategories,
      projects,
      tasks,
    });
  });

  it("should return a valid TaskFormDataDTO", async () => {
    const result = await getTaskFormData(1);

    expect(result).toBeDefined();
    expect(result).toStrictEqual({
      id: 1,
      title: "Task 1",
      description: "Description 1",
      deadline: new Date("2030-12-31").toISOString(),
      status: TaskStatus.active,
      projectId: 1,
      categoryId: 1,
      assigneeId: "user-1",
    });
  });

  it("should return null", async () => {
    const failure = await getTaskFormData(999);
    expect(failure).toBeNull();
  });
});
