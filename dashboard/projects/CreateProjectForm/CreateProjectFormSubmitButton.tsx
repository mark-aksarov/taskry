"use client";

import { useTranslations } from "next-intl";
import { useCreateProject } from "../CreateProjectContext";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";

export function CreateProjectFormSubmitButton() {
  const t = useTranslations("dashboard.projects.CreateProjectForm");

  const { isPending } = useCreateProject();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="create-project-form"
      label={t("submitButtonLabel")}
    />
  );
}
