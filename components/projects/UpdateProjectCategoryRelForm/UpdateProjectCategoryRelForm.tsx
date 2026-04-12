"use client";

import { startTransition } from "react";
import { FormBase } from "@/components/common/FormBase";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { useUpdateProjectCategoryRel } from "../UpdateProjectCategoryRelContext";
import { ProjectCategorySelect } from "../../projectCategory/ProjectCategorySelect";

interface UpdateProjectCategoryRelFormProps {
  projectId: number;
  categoryId?: number;
  projectCategorySelectItems: { id: number; name: string }[];
}

export function UpdateProjectCategoryRelForm({
  projectId,
  categoryId,
  projectCategorySelectItems,
}: UpdateProjectCategoryRelFormProps) {
  const { state, isPending, action } = useUpdateProjectCategoryRel();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-project-category-rel-form" onSubmit={handleSubmit}>
      {projectId && <input type="hidden" name="id" value={projectId} />}
      <ProjectCategorySelect
        defaultSelectedKey={categoryId?.toString()}
        items={projectCategorySelectItems}
      />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
