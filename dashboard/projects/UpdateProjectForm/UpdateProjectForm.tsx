"use client";

import { startTransition } from "react";
import { CalendarDate } from "@internationalized/date";
import { FormBase } from "@/dashboard/common/FormBase";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useUpdateProject } from "../UpdateProjectContext";
import { ProjectStatusSelect } from "../ProjectStatusSelect";
import { ProjectTitleTextField } from "../ProjectTitleTextField";
import { ClientSelect } from "@/dashboard/client/ClientSelect";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { ProjectDeadlineDatePicker } from "../ProjectDeadlineDatePicker";
import { ProjectDescriptionTextField } from "../ProjectDescriptionTextField";
import { ProjectCategorySelect } from "../../projectCategory/ProjectCategorySelect";

interface UpdateProjectFormProps {
  projectId: number;
  title: string;
  description?: string;
  deadline: string;
  status: ProjectStatus;
  categoryId?: number;
  clientId?: number;
  projectCategorySelectItems: { id: number; name: string }[];
  clientSelectItems: { id: number; fullName: string }[];
}

export function UpdateProjectForm({
  projectId,
  title,
  description,
  deadline,
  status,
  categoryId,
  clientId,
  projectCategorySelectItems,
  clientSelectItems,
}: UpdateProjectFormProps) {
  const { state, isPending, action } = useUpdateProject();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  const d = new Date(deadline);
  const deadlineValue = new CalendarDate(
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate(),
  );

  return (
    <FormBase id="update-project-form" onSubmit={handleSubmit}>
      {projectId && <input type="hidden" name="id" value={projectId} />}
      <ProjectTitleTextField defaultValue={title} />
      <ProjectDeadlineDatePicker defaultValue={deadlineValue} />
      <ProjectDescriptionTextField defaultValue={description} />
      <ProjectStatusSelect defaultSelectedKey={status} />
      <ProjectCategorySelect
        defaultSelectedKey={categoryId?.toString()}
        items={projectCategorySelectItems}
      />
      <ClientSelect
        defaultSelectedKey={clientId?.toString()}
        items={clientSelectItems}
      />

      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
