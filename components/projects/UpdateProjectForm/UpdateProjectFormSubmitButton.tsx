"use client";

import { useTranslations } from "next-intl";
import { useUpdateProject } from "../UpdateProjectContext";
import { FormBaseSubmitButton } from "@/components/common/FormBase";

export function UpdateProjectFormSubmitButton() {
  const t = useTranslations("projects.UpdateProjectForm");

  const { isPending } = useUpdateProject();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-project-form"
      label={t("submitButtonLabel")}
    />
  );
}
