import { NewTaskForm } from "../NewTaskForm";
import {
  TaskFormBaseAssigneeSelect,
  TaskFormBaseCategorySelect,
  TaskFormBaseProjectSelect,
  TaskFormBaseStatusSelect,
} from "../TaskFormBase";
import { getUserSummaries } from "@/lib/queries/user";
import { getProjectSummaries } from "@/lib/queries/project";
import {
  getTaskCategorySummaries,
  getTaskStatusSummaries,
} from "@/lib/queries/task";

export async function NewTaskFormServerContainer() {
  const statuses = await getTaskStatusSummaries();
  const categories = await getTaskCategorySummaries(1);
  const projects = await getProjectSummaries(1);
  const users = await getUserSummaries(1);

  return (
    <NewTaskForm
      taskStatusSelect={
        <TaskFormBaseStatusSelect
          statuses={statuses.map((s) => ({ id: s.id, name: s.nameEn }))}
        />
      }
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
