"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { UserSelect } from "../../users/UserSelect";
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
  const t = useTranslations("tasks.UpdateTaskAssigneeForm");

  const { state, isPending, action } = useUpdateTaskAssignee();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="edit-task-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        {taskId && <input type="hidden" name="id" value={taskId} />}
        <UserSelect
          defaultSelectedKey={assigneeId?.toString()}
          items={assigneeSelectItems}
        />
        <FormErrorBanner status={state.status} isPending={isPending}>
          {state.message}
        </FormErrorBanner>
      </FormBaseBody>
      <FormBaseFooter>
        <FormBaseSubmitButton
          isPending={isPending}
          label={t("submitButtonLabel")}
        />
      </FormBaseFooter>
    </FormBase>
  );
}
