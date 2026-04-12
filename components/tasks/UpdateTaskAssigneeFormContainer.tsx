"use client";

import {
  UpdateTaskAssigneeForm,
  UpdateTaskAssigneeFormSkeleton,
} from "./UpdateTaskAssigneeForm";

import useSWR from "swr";
import { UserSummaryDTO } from "@/lib/data/user/user.dto";

interface UpdateTaskAssigneeFormContainerProps {
  taskId: number;
  assigneeId?: string;
}

export function UpdateTaskAssigneeFormContainer({
  taskId,
  assigneeId,
}: UpdateTaskAssigneeFormContainerProps) {
  const { data: users } = useSWR<UserSummaryDTO[]>("/api/users");

  // Show skeleton while loading
  if (!users) {
    return <UpdateTaskAssigneeFormSkeleton />;
  }

  return (
    <UpdateTaskAssigneeForm
      taskId={taskId}
      assigneeId={assigneeId}
      assigneeSelectItems={users}
    />
  );
}
