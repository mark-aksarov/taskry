"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { useCreateTaskCategory } from "./CreateTaskCategoryContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { TaskCategoryNameTextField } from "./TaskCategoryNameTextField";

export function CreateTaskCategoryForm() {
  const t = useTranslations("taskCategories.CreateTaskCategoryForm");

  const { state, action, isPending } = useCreateTaskCategory();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="new-task-category-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <TaskCategoryNameTextField />
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
