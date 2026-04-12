"use client";

import { startTransition } from "react";
import { FormBase } from "@/components/common/FormBase";
import { useCreateTaskCategory } from "../CreateTaskCategoryContext";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { TaskCategoryNameTextField } from "../TaskCategoryNameTextField";

export function CreateTaskCategoryForm() {
  const { state, action, isPending } = useCreateTaskCategory();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="create-task-category-form" onSubmit={handleSubmit}>
      <TaskCategoryNameTextField />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
