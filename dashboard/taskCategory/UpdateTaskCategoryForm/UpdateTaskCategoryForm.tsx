"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { useUpdateTaskCategory } from "../UpdateTaskCategoryContext";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { TaskCategoryNameTextField } from "../TaskCategoryNameTextField";

interface UpdateTaskCategoryFormProps {
  taskCategoryId: number;
  nameDefaultValue: string;
}

export function UpdateTaskCategoryForm({
  taskCategoryId,
  nameDefaultValue,
}: UpdateTaskCategoryFormProps) {
  const { state, isPending, action } = useUpdateTaskCategory();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-task-category-form" onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={taskCategoryId} />
      <TaskCategoryNameTextField defaultValue={nameDefaultValue} />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
