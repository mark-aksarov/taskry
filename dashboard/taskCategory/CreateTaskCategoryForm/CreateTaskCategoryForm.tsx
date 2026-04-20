"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { useCreateTaskCategory } from "../CreateTaskCategoryContext";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
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
