import {
  TaskFormBaseAssigneeSelect,
  TaskFormBaseCategorySelect,
  TaskFormBaseProjectSelect,
  TaskFormBaseStatusSelect,
} from "../TaskFormBase";

import useSWR from "swr";
import { NewTaskForm } from "../NewTaskForm";
import { GeUserSummariesType } from "@/lib/queries/user";
import { GetProjectSummariesType } from "@/lib/queries/project";
import { GetTaskCategorySummariesType } from "@/lib/queries/task";

export function EditTaskFormClientContainer() {
  const { data: categories } = useSWR<GetTaskCategorySummariesType>(
    `/api/task-categories`,
    { suspense: true },
  );
  const { data: projects } = useSWR<GetProjectSummariesType>(`/api/projects`, {
    suspense: true,
  });
  const { data: users } = useSWR<GeUserSummariesType>(`/api/users`, {
    suspense: true,
  });

  if (!categories || !projects || !users) return null;

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
