"use client";

import { startTransition } from "react";
import { FormBase } from "@/dashboard/common/FormBase";
import { useCreateProject } from "../CreateProjectContext";
import { ProjectStatusSelect } from "../ProjectStatusSelect";
import { ProjectTitleTextField } from "../ProjectTitleTextField";
import { CustomerSelect } from "@/dashboard/customer/CustomerSelect";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { ProjectDeadlineDatePicker } from "../ProjectDeadlineDatePicker";
import { ProjectDescriptionTextField } from "../ProjectDescriptionTextField";
import { ProjectCategorySelect } from "../../projectCategory/ProjectCategorySelect";

interface CreateProjectFormProps {
  projectCategorySelectItems: { id: number; name: string }[];
  customerSelectItems: { id: number; fullName: string }[];
}

export function CreateProjectForm({
  projectCategorySelectItems,
  customerSelectItems,
}: CreateProjectFormProps) {
  const { state, action, isPending } = useCreateProject();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="create-project-form" onSubmit={handleSubmit}>
      <ProjectTitleTextField />
      <ProjectDeadlineDatePicker />
      <ProjectDescriptionTextField />
      <ProjectStatusSelect />
      <ProjectCategorySelect items={projectCategorySelectItems} />
      <CustomerSelect items={customerSelectItems} />
      <FormErrorBanner status={state.status} isPending={isPending}>
        {state.message}
      </FormErrorBanner>
    </FormBase>
  );
}
