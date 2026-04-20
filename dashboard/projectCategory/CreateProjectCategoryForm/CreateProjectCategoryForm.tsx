"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { useCreateProjectCategory } from "../CreateProjectCategoryContext";
import { ProjectCategoryNameTextField } from "../ProjectCategoryNameTextField";

export function CreateProjectCategoryForm() {
  const { state, action, isPending } = useCreateProjectCategory();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="create-project-category-form" onSubmit={handleSubmit}>
      <ProjectCategoryNameTextField />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
