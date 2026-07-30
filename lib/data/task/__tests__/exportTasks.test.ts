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

describe("exportTasks", () => {
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

  it("should return tasks with valid TaskCsvDTO", async () => {
    const result = await exportTasks();

    // Assert
    expect(result).toStrictEqual([
      {
        title: "Task 1",
        description: "Description 1",
        deadline: "2030-12-31",
        status: TaskStatus.active,
        projectTitle: "Project 1",
        categoryName: "Task Category 1",
        assigneeEmail: "user-1@test.com",
      },
      {
        title: "Task 2",
        description: "Description 2",
        deadline: "2030-12-30",
        status: TaskStatus.active,
        projectTitle: "Project 1",
        categoryName: "Task Category 1",
        assigneeEmail: "user-1@test.com",
      },
    ]);
  });
});
