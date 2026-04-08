"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { useUpdateTask } from "./UpdateTaskContext";
import { TaskStatus } from "@/generated/prisma/enums";
import { CalendarDate } from "@internationalized/date";
import { TaskStatusSelect } from "./TaskStatusSelect";
import { ProjectSelect } from "../projects/ProjectSelect";
import { TaskCategorySelect } from "../taskCategory/TaskCategorySelect";
import { UserSelect } from "../users/UserSelect";
import { TaskTitleTextField } from "./TaskTitleTextField";
import { TaskDeadlineDatePicker } from "./TaskDeadlineDatePicker";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { TaskDescriptionTextField } from "./TaskDescriptionTextField";

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
  const t = useTranslations("tasks.UpdateTaskForm");

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
    <FormBase id="edit-task-form" onSubmit={handleSubmit}>
      <FormBaseBody>
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
