"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateProjectDescription } from "../UpdateProjectDescriptionContext";

export function UpdateProjectDescriptionFormSubmitButton() {
  const t = useTranslations("dashboard.projects.UpdateProjectDescriptionForm");

  const { isPending } = useUpdateProjectDescription();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-project-description-form"
      label={t("submitButtonLabel")}
    />
  );
}
