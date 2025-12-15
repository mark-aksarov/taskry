import {
  TaskFormBaseStatusSelect,
  TaskFormBaseProjectSelect,
  TaskFormBaseAssigneeSelect,
  TaskFormBaseCategorySelect,
} from "../TaskFormBase";

import { NewTaskForm } from "../NewTaskForm";
import { getUserSummaries } from "@/lib/queries/user";
import { getProjectSummaries } from "@/lib/queries/project";
import { getTaskCategorySummaries } from "@/lib/queries/task";

export async function NewTaskFormServerContainer() {
  const categories = await getTaskCategorySummaries();
  const projects = await getProjectSummaries();
  const users = await getUserSummaries();

  return (
    <NewTaskForm
      taskStatusSelect={<TaskFormBaseStatusSelect />}
      taskCategorySelect={
        <TaskFormBaseCategorySelect
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        />
      }
      projectSelect={
        <TaskFormBaseProjectSelect
          projects={projects.map((p) => ({ id: p.id, title: p.title }))}
        />
      }
      assigneeSelect={
        <TaskFormBaseAssigneeSelect
          users={users.map((u) => ({ id: u.id, fullName: u.fullName }))}
        />
      }
    />
  );
}
