"use client";

import { startTransition } from "react";
import { UserSelect } from "../../users/UserSelect";
import { useUpdateTask } from "../UpdateTaskContext";
import { TaskStatus } from "@/generated/prisma/enums";
import { CalendarDate } from "@internationalized/date";
import { TaskStatusSelect } from "../TaskStatusSelect";
import { FormBase } from "@/dashboard/common/FormBase";
import { TaskTitleTextField } from "../TaskTitleTextField";
import { ProjectSelect } from "../../projects/ProjectSelect";
import { TaskDeadlineDatePicker } from "../TaskDeadlineDatePicker";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { TaskDescriptionTextField } from "../TaskDescriptionTextField";
import { TaskCategorySelect } from "../../taskCategory/TaskCategorySelect";

interface UpdateTaskFormProps {
  taskId: number;
  title: string;
  description?: string;
  deadline: string;
  status: TaskStatus;
  categoryId?: number;
  projectId?: number;
  assigneeId?: string;
  taskCategorySelectItems: { id: number; name: string }[];
  projectSelectItems: { id: number; title: string }[];
  assigneeSelectItems: { id: string; fullName: string }[];
}

export function UpdateTaskForm({
  taskId,
  title,
  description,
  deadline,
  status,
  categoryId,
  projectId,
  assigneeId,
  taskCategorySelectItems,
  projectSelectItems,
  assigneeSelectItems,
}: UpdateTaskFormProps) {
  const { state, isPending, action } = useUpdateTask();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  const d = new Date(deadline);
  const deadlineValue = new CalendarDate(
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate(),
  );

  return (
    <FormBase id="update-task-form" onSubmit={handleSubmit}>
      {taskId && <input type="hidden" name="id" value={taskId} />}
      <TaskTitleTextField defaultValue={title} />
      <TaskDeadlineDatePicker defaultValue={deadlineValue} />
      <TaskDescriptionTextField defaultValue={description} />
      <TaskStatusSelect defaultSelectedKey={status} />
      <TaskCategorySelect
        defaultSelectedKey={categoryId?.toString()}
        items={taskCategorySelectItems}
      />
      <ProjectSelect
        defaultSelectedKey={projectId?.toString()}
        items={projectSelectItems}
      />
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
