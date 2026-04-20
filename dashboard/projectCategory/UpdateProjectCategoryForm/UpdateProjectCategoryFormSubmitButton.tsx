"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/dashboard/common/FormBase";
import { useUpdateProjectCategory } from "../UpdateProjectCategoryContext";

export function UpdateProjectCategoryFormSubmitButton() {
  const t = useTranslations(
    "dashboard.projectCategories.UpdateProjectCategoryForm",
  );

  const { isPending } = useUpdateProjectCategory();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-project-category-form"
      label={t("submitButtonLabel")}
    />
  );
}
