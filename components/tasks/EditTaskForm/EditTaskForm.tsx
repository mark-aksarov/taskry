"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { DateValue } from "react-aria";
import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { useUpdateTask } from "../UpdateTaskContext";
import { TaskStatus } from "@/generated/prisma/enums";
import { TaskStatusSelect } from "../TaskStatusSelect";
import { TaskProjectSelect } from "../TaskProjectSelect";
import { TaskCategorySelect } from "../TaskCategorySelect";
import { TaskAssigneeSelect } from "../TaskAssigneeSelect";
import { TaskTitleTextField } from "../TaskTitleTextField";
import { TaskDeadlineDatePicker } from "../TaskDeadlineDatePicker";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { TaskDescriptionTextField } from "../TaskDescriptionTextField";

interface EditTaskFormProps {
  taskId: number;
  taskTitleDefaultValue: string;
  taskDescriptionDefaultValue?: string;
  taskDeadlineDefaultValue: DateValue;
  taskStatusSelectDefaultValue: TaskStatus;
  taskCategorySelectDefaultValue?: string;
  taskProjectSelectDefaultValue?: string;
  taskAssigneeSelectDefaultValue?: string;
  taskCategorySelectItems: { id: number; name: string }[];
  taskProjectSelectItems: { id: number; title: string }[];
  taskAssigneeSelectItems: { id: string; fullName: string }[];
}

export function EditTaskForm({
  taskId,
  taskTitleDefaultValue,
  taskDescriptionDefaultValue,
  taskDeadlineDefaultValue,
  taskStatusSelectDefaultValue,
  taskCategorySelectDefaultValue,
  taskProjectSelectDefaultValue,
  taskAssigneeSelectDefaultValue,
  taskCategorySelectItems,
  taskProjectSelectItems,
  taskAssigneeSelectItems,
}: EditTaskFormProps) {
  const t = useTranslations("tasks.EditTaskForm");

  const { state, isPending, action } = useUpdateTask();

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
        <TaskTitleTextField defaultValue={taskTitleDefaultValue} />
        <TaskDescriptionTextField defaultValue={taskDescriptionDefaultValue} />
        <TaskDeadlineDatePicker defaultValue={taskDeadlineDefaultValue} />
        <TaskStatusSelect defaultSelectedKey={taskStatusSelectDefaultValue} />
        <TaskCategorySelect
          defaultSelectedKey={taskCategorySelectDefaultValue}
          items={taskCategorySelectItems}
        />
        <TaskProjectSelect
          defaultSelectedKey={taskProjectSelectDefaultValue}
          items={taskProjectSelectItems}
        />
        <TaskAssigneeSelect
          defaultSelectedKey={taskAssigneeSelectDefaultValue}
          items={taskAssigneeSelectItems}
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
