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
  const showSkeleton = !users || !task || isValidatingTask;

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
