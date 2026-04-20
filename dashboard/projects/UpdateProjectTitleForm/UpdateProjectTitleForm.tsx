"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { ProjectTitleTextField } from "../ProjectTitleTextField";
import { useUpdateProjectTitle } from "../UpdateProjectTitleContext";

interface UpdateProjectTitleFormProps {
  projectId: number;
  title: string;
}

export function UpdateProjectTitleForm({
  projectId,
  title,
}: UpdateProjectTitleFormProps) {
  const { state, isPending, action } = useUpdateProjectTitle();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-project-title-form" onSubmit={handleSubmit}>
      {projectId && <input type="hidden" name="id" value={projectId} />}
      <ProjectTitleTextField defaultValue={title} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
