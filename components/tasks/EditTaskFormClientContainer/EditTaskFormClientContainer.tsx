import {
  TaskFormBaseAssigneeSelect,
  TaskFormBaseCategorySelect,
  TaskFormBaseProjectSelect,
  TaskFormBaseStatusSelect,
} from "../TaskFormBase";

import useSWR from "swr";
import { NewTaskForm } from "../NewTaskForm";
import { UserSummaryDTO } from "@/lib/dto/user";
import { ProjectSummaryDTO } from "@/lib/dto/project";
import { TaskCategorySummaryDTO } from "@/lib/dto/task";

export function EditTaskFormClientContainer() {
  const { data: categories } = useSWR<TaskCategorySummaryDTO[]>(
    `/api/task-categories`,
    { suspense: true },
  );

  const { data: projects } = useSWR<ProjectSummaryDTO[]>(`/api/projects`, {
    suspense: true,
  });

  const { data: users } = useSWR<UserSummaryDTO[]>(`/api/users`, {
    suspense: true,
  });

  if (!categories || !projects || !users) return null;

  return (
    <NewTaskForm
      taskStatusSelect={<TaskFormBaseStatusSelect />}
      taskCategorySelect={
        <TaskFormBaseCategorySelect categories={categories} />
      }
      projectSelect={<TaskFormBaseProjectSelect projects={projects} />}
      assigneeSelect={<TaskFormBaseAssigneeSelect users={users} />}
    />
  );
}
