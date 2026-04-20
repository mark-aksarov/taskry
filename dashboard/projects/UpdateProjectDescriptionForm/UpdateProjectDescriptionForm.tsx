"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { ProjectDescriptionTextField } from "../ProjectDescriptionTextField";
import { useUpdateProjectDescription } from "../UpdateProjectDescriptionContext";

interface UpdateProjectDescriptionFormProps {
  projectId: number;
  description?: string;
}

export function UpdateProjectDescriptionForm({
  projectId,
  description,
}: UpdateProjectDescriptionFormProps) {
  const { state, isPending, action } = useUpdateProjectDescription();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-project-description-form" onSubmit={handleSubmit}>
      {projectId && <input type="hidden" name="id" value={projectId} />}
      <ProjectDescriptionTextField defaultValue={description} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
