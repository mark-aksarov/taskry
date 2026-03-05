"use client";

import useSWR from "swr";
import { EditTaskForm } from "./EditTaskForm";
import { TaskFormSkeleton } from "./TaskFormSkeleton";
import { CalendarDate } from "@internationalized/date";
import { UserSummaryDTO } from "@/lib/data/user/user.dto";
import { TaskFormDataDTO } from "@/lib/data/task/task.dto";
import { ProjectSummaryDTO } from "@/lib/data/project/project.dto";
import { TaskCategorySummaryDTO } from "@/lib/data/taskCategory/taskCategory.dto";

interface EditTaskFormContainerProps {
  taskId: number;
}

export function EditTaskFormContainer({ taskId }: EditTaskFormContainerProps) {
  const { data: categories } = useSWR<TaskCategorySummaryDTO[]>(
    "/api/task-categories",
    {
      revalidateIfStale: false, // don't revalidate on each mount
      revalidateOnFocus: false,
    },
  );

  const { data: projects } = useSWR<ProjectSummaryDTO[]>("/api/projects", {
    revalidateIfStale: false, // don't revalidate on each mount
    revalidateOnFocus: false,
  });

  const { data: users } = useSWR<UserSummaryDTO[]>("/api/users", {
    revalidateIfStale: false, // don't revalidate on each mount
    revalidateOnFocus: false,
  });

  // Current task data for editing (loaded each modal open)
  const { data: task, isValidating: isValidatingTask } =
    useSWR<TaskFormDataDTO | null>(`/api/tasks/${taskId}?view=edit`);

  //Error handling for 404 (NotFound) error. https://swr.vercel.app/docs/error-handling

  // Show skeleton while loading or revalidating
  const showSkeleton =
    !categories || !projects || !users || !task || isValidatingTask;

  if (showSkeleton) {
    return <TaskFormSkeleton />;
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
      taskTitleDefaultValue={task.title}
      taskDescriptionDefaultValue={task.description}
      taskDeadlineDefaultValue={dateValue}
      taskStatusSelectDefaultValue={task.status}
      taskCategorySelectDefaultValue={
        task.categoryId ? task.categoryId.toString() : ""
      }
      taskProjectSelectDefaultValue={task.projectId.toString()}
      taskAssigneeSelectDefaultValue={
        task.assigneeId ? task.assigneeId.toString() : ""
      }
      taskCategorySelectItems={categories}
      taskProjectSelectItems={projects}
      taskAssigneeSelectItems={users}
    />
  );
}
