"use client";

import { useTranslations } from "next-intl";
import { useUpdateProject } from "../UpdateProjectContext";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";

export function UpdateProjectFormSubmitButton() {
  const t = useTranslations("dashboard.projects.UpdateProjectForm");

  const { isPending } = useUpdateProject();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-project-form"
      label={t("submitButtonLabel")}
    />
  );
}
