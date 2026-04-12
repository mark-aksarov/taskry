"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/components/common/FormBase";
import { useUpdateProjectCategory } from "../UpdateProjectCategoryContext";

export function UpdateProjectCategoryFormSubmitButton() {
  const t = useTranslations("projectCategories.UpdateProjectCategoryForm");

  const { isPending } = useUpdateProjectCategory();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="update-project-category-form"
      label={t("submitButtonLabel")}
    />
  );
}
