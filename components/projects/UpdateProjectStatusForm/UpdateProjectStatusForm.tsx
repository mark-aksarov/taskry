"use client";

import { startTransition } from "react";
import { FormBase } from "@/components/common/FormBase";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ProjectStatusSelect } from "../ProjectStatusSelect";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { useUpdateProjectStatusAlt } from "../UpdateProjectStatusAltContext";

export interface UpdateProjectStatusFormProps {
  projectId: number;
  status: ProjectStatus;
}

export function UpdateProjectStatusForm({
  projectId,
  status,
}: UpdateProjectStatusFormProps) {
  const { state, action, isPending } = useUpdateProjectStatusAlt();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="update-project-status-form" onSubmit={handleSubmit}>
      {projectId && <input type="hidden" name="id" value={projectId} />}
      <ProjectStatusSelect defaultSelectedKey={status} />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
