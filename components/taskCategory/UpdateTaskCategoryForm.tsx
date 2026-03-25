"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { useUpdateTaskCategory } from "./UpdateTaskCategoryContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { TaskCategoryNameTextField } from "./TaskCategoryNameTextField";

interface UpdateTaskCategoryFormProps {
  taskCategoryId: number;
  nameDefaultValue: string;
}

export function UpdateTaskCategoryForm({
  taskCategoryId,
  nameDefaultValue,
}: UpdateTaskCategoryFormProps) {
  const t = useTranslations("taskCategories.UpdateTaskCategoryForm");

  const { state, isPending, action } = useUpdateTaskCategory();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="edit-task-category-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <input type="hidden" name="id" value={taskCategoryId} />
        <TaskCategoryNameTextField defaultValue={nameDefaultValue} />
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
