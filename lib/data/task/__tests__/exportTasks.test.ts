import {
  users,
  tasks,
  projects,
  positions,
  companies,
  clients,
  organizations,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import { exportTasks } from "../task.dal";
import { seed } from "@/prisma/test-seed";
import { loginAs } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { TaskStatus } from "@/generated/prisma/enums";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getTasks", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions,
      users,
      companies,
      clients,
      taskCategories,
      projectCategories,
      projects,
      tasks,
    });

    await loginAs("user-1");
  });

  it("should return tasks with valid TaskDTO", async () => {
    const result = await exportTasks();

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
