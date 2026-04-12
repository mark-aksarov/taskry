"use client";

import { useTranslations } from "next-intl";
import { FormBaseSubmitButton } from "@/components/common/FormBase";
import { useCreateProjectCategory } from "../CreateProjectCategoryContext";

export function CreateProjectCategoryFormSubmitButton() {
  const t = useTranslations("projectCategories.CreateProjectCategoryForm");

  const { isPending } = useCreateProjectCategory();

  return (
    <FormBaseSubmitButton
      isPending={isPending}
      form="create-project-category-form"
      label={t("submitButtonLabel")}
    />
  );
}
