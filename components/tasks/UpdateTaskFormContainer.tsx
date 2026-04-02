"use client";

import useSWR from "swr";
import { UpdateTaskForm } from "./UpdateTaskForm";
import { TaskFormSkeleton } from "./TaskFormSkeleton";
import { UserSummaryDTO } from "@/lib/data/user/user.dto";
import { TaskFormDataDTO } from "@/lib/data/task/task.dto";
import { ProjectSummaryDTO } from "@/lib/data/project/project.dto";
import { TaskCategorySummaryDTO } from "@/lib/data/taskCategory/taskCategory.dto";

interface UpdateTaskFormContainerProps {
  taskId: number;
}

export function UpdateTaskFormContainer({
  taskId,
}: UpdateTaskFormContainerProps) {
  const { data: categories } = useSWR<TaskCategorySummaryDTO[]>(
    "/api/task-categories",
    {
      revalidateOnFocus: false,
    },
  );

  const { data: projects } = useSWR<ProjectSummaryDTO[]>("/api/projects", {
    revalidateOnFocus: false,
  });

  const { data: users } = useSWR<UserSummaryDTO[]>("/api/users", {
    revalidateOnFocus: false,
  });

  const {
    data: task,
    isValidating: isValidatingTask,
    error: taskError,
  } = useSWR<TaskFormDataDTO | null>(`/api/tasks/${taskId}?view=edit`, {
    revalidateOnFocus: false,
  });

  if (taskError) {
    throw new Error();
  }

  // Show skeleton while loading or revalidating
  const showSkeleton =
    !categories || !projects || !users || !task || isValidatingTask;

  if (showSkeleton) {
    return <TaskFormSkeleton />;
  }

  return (
    <UpdateTaskForm
      taskId={taskId}
      title={task.title}
      description={task.description}
      deadline={task.deadline}
      status={task.status}
      categoryId={task.categoryId}
      projectId={task.projectId}
      assigneeId={task.assigneeId}
      taskCategorySelectItems={categories}
      projectSelectItems={projects}
      assigneeSelectItems={users}
    />
  );
}
