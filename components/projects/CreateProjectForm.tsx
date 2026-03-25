"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { useCreateProject } from "./CreateProjectContext";
import { ProjectStatusSelect } from "./ProjectStatusSelect";
import { ProjectTitleTextField } from "./ProjectTitleTextField";
import { CustomerSelect } from "@/components/customer/CustomerSelect";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { ProjectDeadlineDatePicker } from "./ProjectDeadlineDatePicker";
import { ProjectDescriptionTextField } from "./ProjectDescriptionTextField";
import { ProjectCategorySelect } from "../projectCategory/ProjectCategorySelect";

interface CreateProjectFormProps {
  projectCategorySelectItems: { id: number; name: string }[];
  customerSelectItems: { id: number; fullName: string }[];
}

export function CreateProjectForm({
  projectCategorySelectItems,
  customerSelectItems,
}: CreateProjectFormProps) {
  const t = useTranslations("projects.CreateProjectForm");

  const { state, action, isPending } = useCreateProject();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="new-project-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <ProjectTitleTextField />
        <ProjectDescriptionTextField />
        <ProjectDeadlineDatePicker />
        <ProjectStatusSelect />
        <ProjectCategorySelect items={projectCategorySelectItems} />
        <CustomerSelect items={customerSelectItems} />
        <FormErrorBanner status={state.status} isPending={isPending}>
          {state.message}
        </FormErrorBanner>
      </FormBaseBody>
      <FormBaseFooter>
        <FormBaseSubmitButton
          isPending={isPending}
          label={t("submitButtonLabel")}
        />
      </FormBaseFooter>
    </FormBase>
  );
}
