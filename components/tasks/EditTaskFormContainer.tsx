"use client";

import {
  TaskFormBase,
  TaskFormBaseStatusSelect,
  TaskFormBaseProjectSelect,
  TaskFormBaseAssigneeSelect,
  TaskFormBaseCategorySelect,
} from "./TaskFormBase";

import useSWR from "swr";
import { CalendarDate } from "@internationalized/date";
import { UserSummaryDTO } from "@/lib/data/user/user.dto";
import { updateTask } from "@/lib/actions/task/updateTask";
import { TaskFormDataDTO } from "@/lib/data/task/task.dto";
import { ProjectSummaryDTO } from "@/lib/data/project/project.dto";
import { TaskCategorySummaryDTO } from "@/lib/data/taskCategory/taskCategory.dto";

export function EditTaskFormContainer({ taskId }: { taskId: number }) {
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

  const { data: task } = useSWR<TaskFormDataDTO>(
    `/api/tasks/${taskId}?view=edit`,
    {
      suspense: true,
    },
  );

  if (!categories || !projects || !users || !task) {
    throw new Error("Task not found");
  }

  const d = new Date(task.deadline);
  const dateValue = new CalendarDate(
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate(),
  );

  return (
    <TaskFormBase
      id="edit-task-form"
      taskId={taskId}
      taskTitleDefaultValue={task.title}
      taskDescriptionDefaultValue={task.description}
      taskDeadlineDefaultValue={dateValue}
      taskStatusSelect={
        <TaskFormBaseStatusSelect
          defaultSelectedKey={task.status}
          projectStatus={task.projectStatus}
        />
      }
      taskCategorySelect={
        <TaskFormBaseCategorySelect
          defaultSelectedKey={task.categoryId.toString()}
          categories={categories}
        />
      }
      projectSelect={
        <TaskFormBaseProjectSelect
          defaultSelectedKey={task.projectId.toString()}
          projects={projects}
        />
      }
      assigneeSelect={
        <TaskFormBaseAssigneeSelect
          defaultSelectedKey={task.assigneeId?.toString()}
          users={users}
        />
      }
      formAction={updateTask}
    />
  );
}
