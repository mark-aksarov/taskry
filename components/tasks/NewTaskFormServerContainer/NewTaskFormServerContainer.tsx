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
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";

export async function NewTaskFormServerContainer() {
  const workspaceId = await getUserWorkspaceId();
  const categories = await getTaskCategorySummaries(workspaceId);
  const projects = await getProjectSummaries(workspaceId);
  const users = await getUserSummaries(workspaceId);

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
