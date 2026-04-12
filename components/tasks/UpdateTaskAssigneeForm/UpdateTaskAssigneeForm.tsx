"use client";

import { startTransition } from "react";
import { UserSelect } from "../../users/UserSelect";
import { FormBase } from "@/components/common/FormBase";
import { useUpdateTaskAssignee } from "../UpdateTaskAssigneeContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

interface UpdateTaskAssigneeFormProps {
  taskId: number;
  assigneeId?: string;
  assigneeSelectItems: { id: string; fullName: string }[];
}

export function UpdateTaskAssigneeForm({
  taskId,
  assigneeId,
  assigneeSelectItems,
}: UpdateTaskAssigneeFormProps) {
  const { state, isPending, action } = useUpdateTaskAssignee();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-task-assignee-form" onSubmit={handleSubmit}>
      {taskId && <input type="hidden" name="id" value={taskId} />}
      <UserSelect
        defaultSelectedKey={assigneeId?.toString()}
        items={assigneeSelectItems}
      />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
