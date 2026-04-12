"use client";

import {
  UpdateTaskAssigneeForm,
  UpdateTaskAssigneeFormSkeleton,
} from "./UpdateTaskAssigneeForm";

import useSWR from "swr";
import { UserSummaryDTO } from "@/lib/data/user/user.dto";
import { TaskFormDataDTO } from "@/lib/data/task/task.dto";

interface UpdateTaskAssigneeFormContainerProps {
  taskId: number;
}

export function UpdateTaskAssigneeFormContainer({
  taskId,
}: UpdateTaskAssigneeFormContainerProps) {
  const { data: users } = useSWR<UserSummaryDTO[]>("/api/users");

  const {
    data: task,
    error: taskError,
    isValidating,
  } = useSWR<TaskFormDataDTO | null>(`/api/tasks/${taskId}?view=edit`, {
    // disable revalidation on focus to prevent UI flicker caused by isValidating
    revalidateOnFocus: false,
  });

  if (taskError) {
    throw new Error();
  }

  // Show skeleton while loading
  // or revalidating to prevent stale data rendering
  const showSkeleton = !users || !task || isValidating;

  if (showSkeleton) {
    return <UpdateTaskAssigneeFormSkeleton />;
  }

  return (
    <UpdateTaskAssigneeForm
      taskId={taskId}
      assigneeId={task.assigneeId}
      assigneeSelectItems={users}
    />
  );
}
