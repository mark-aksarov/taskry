import {
  users,
  tasks,
  projects,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import { getTasks } from "../task.dal";
import { seed } from "@/prisma/test-seed";
import { TaskStatus } from "@/generated/prisma/enums";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { requireSession } from "@/lib/data/utils/requireSession";

describe("getTasks", () => {
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

  it("should return tasks with valid TaskDTO", async () => {
    const result = await getTasks();

    // Assert
    expect(result).toStrictEqual([
      {
        id: 1,
        title: "Task 1",
        description: "Description 1",
        deadline: new Date("2030-12-31").toISOString(),
        status: TaskStatus.active,
        projectId: 1,
        categoryId: 1,
        assigneeId: "user-1",
      },
      {
        id: 2,
        title: "Task 2",
        description: "Description 2",
        deadline: new Date("2030-12-30").toISOString(),
        status: TaskStatus.active,
        projectId: 1,
        categoryId: 1,
        assigneeId: "user-1",
      },
    ]);
  });
});
