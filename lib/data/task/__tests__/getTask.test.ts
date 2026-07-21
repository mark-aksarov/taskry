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
} from "@/prisma/seed/test-data";

import { getTask } from "../task.dal";
import { seed } from "@/prisma/test-seed";
import { TaskStatus } from "@/generated/prisma/enums";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getTask", () => {
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

  it("should return a valid TaskDTO", async () => {
    const result = await getTask(1);

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
    const failure = await getTask(999);
    expect(failure).toBeNull();
  });
});
