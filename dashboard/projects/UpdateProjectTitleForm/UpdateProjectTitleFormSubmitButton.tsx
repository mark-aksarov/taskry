"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateProjectTitle } from "../UpdateProjectTitleContext";

export function UpdateProjectTitleFormSubmitButton() {
  const t = useTranslations("dashboard.projects.UpdateProjectTitleForm");

  const { isPending } = useUpdateProjectTitle();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-project-title-form"
      label={t("submitButtonLabel")}
    />
  );
}
