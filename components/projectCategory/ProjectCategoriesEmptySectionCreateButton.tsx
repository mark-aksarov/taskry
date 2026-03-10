"use client";

import { useTranslations } from "next-intl";
import { EmptySectionButton } from "@/components/common/EmptySection";
import { useCreateProjectCategory } from "./CreateProjectCategoryContext";

export function ProjectCategoriesEmptySectionCreateButton() {
  const t = useTranslations(
    "projectCategories.ProjectCategoriesEmptySectionCreateButton",
  );

  const { onModalOpenChange } = useCreateProjectCategory();

  return (
    <EmptySectionButton onPress={() => onModalOpenChange(true)}>
      {t("label")}
    </EmptySectionButton>
  );
}
