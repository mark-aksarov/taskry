"use client";

import useSWR from "swr";
import { Suspense } from "react";
import { EditTaskForm } from "./EditTaskForm";
import { TaskFormSkeleton } from "./TaskFormSkeleton";
import { CalendarDate } from "@internationalized/date";
import { TaskProjectSelect } from "./TaskProjectSelect";
import { TaskAssigneeSelect } from "./TaskAssigneeSelect";
import { UserSummaryDTO } from "@/lib/data/user/user.dto";
import { TaskCategorySelect } from "./TaskCategorySelect";
import { updateTask } from "@/lib/actions/task/updateTask";
import { TaskFormDataDTO } from "@/lib/data/task/task.dto";
import { ProjectSummaryDTO } from "@/lib/data/project/project.dto";
import { TaskCategorySummaryDTO } from "@/lib/data/taskCategory/taskCategory.dto";

interface EditTaskFormContainerProps {
  taskId: number;
}

export function EditTaskFormContainer(props: EditTaskFormContainerProps) {
  return (
    <Suspense fallback={<TaskFormSkeleton />}>
      <EditTaskFormContainerInner {...props} />
    </Suspense>
  );
}

function EditTaskFormContainerInner({ taskId }: EditTaskFormContainerProps) {
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
    <EditTaskForm
      taskId={taskId}
      titleDefaultValue={task.title}
      descriptionDefaultValue={task.description}
      deadlineDefaultValue={dateValue}
      statusSelectDefaultValue={task.status}
      taskCategorySelect={
        <TaskCategorySelect
          defaultSelectedKey={task.categoryId ? task.categoryId.toString() : ""}
          categories={categories}
        />
      }
      projectSelect={
        <TaskProjectSelect
          defaultSelectedKey={task.projectId.toString()}
          projects={projects}
        />
      }
      assigneeSelect={
        <TaskAssigneeSelect
          defaultSelectedKey={task.assigneeId ? task.assigneeId.toString() : ""}
          users={users}
        />
      }
      updateTask={updateTask}
    />
  );
}
