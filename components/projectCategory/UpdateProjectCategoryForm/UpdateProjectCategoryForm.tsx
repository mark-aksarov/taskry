"use client";

import { startTransition } from "react";
import { FormBase } from "@/components/common/FormBase";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { useUpdateProjectCategory } from "../UpdateProjectCategoryContext";
import { ProjectCategoryNameTextField } from "../ProjectCategoryNameTextField";

interface UpdateProjectCategoryFormProps {
  projectCategoryId: number;
  nameDefaultValue: string;
}

export function UpdateProjectCategoryForm({
  projectCategoryId,
  nameDefaultValue,
}: UpdateProjectCategoryFormProps) {
  const { state, isPending, action } = useUpdateProjectCategory();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-project-category-form" onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={projectCategoryId} />
      <ProjectCategoryNameTextField defaultValue={nameDefaultValue} />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
