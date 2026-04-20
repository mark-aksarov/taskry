"use client";

import { startTransition } from "react";
import { UserSelect } from "../../users/UserSelect";
import { useCreateTask } from "../CreateTaskContext";
import { TaskStatusSelect } from "../TaskStatusSelect";
import { FormBase } from "@/dashboard/common/FormBase";
import { TaskTitleTextField } from "../TaskTitleTextField";
import { ProjectSelect } from "../../projects/ProjectSelect";
import { TaskDeadlineDatePicker } from "../TaskDeadlineDatePicker";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { TaskDescriptionTextField } from "../TaskDescriptionTextField";
import { TaskCategorySelect } from "../../taskCategory/TaskCategorySelect";

interface CreateTaskFormProps {
  forcedAssigneeId?: string;
  categorySelectItems: { id: number; name: string }[];
  projectSelectItems: { id: number; title: string }[];
  assigneeSelectItems: { id: string; fullName: string }[];
}

export function CreateTaskForm({
  forcedAssigneeId,
  categorySelectItems,
  projectSelectItems,
  assigneeSelectItems,
}: CreateTaskFormProps) {
  const { state, action, isPending } = useCreateTask();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="create-task-form" onSubmit={handleSubmit}>
      <TaskTitleTextField />
      <TaskDeadlineDatePicker />
      <TaskDescriptionTextField />
      <TaskStatusSelect />
      <TaskCategorySelect items={categorySelectItems} />
      <ProjectSelect items={projectSelectItems} />
      <UserSelect
        forcedAssigneeId={forcedAssigneeId}
        items={assigneeSelectItems}
      />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
