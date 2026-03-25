"use client";

import { useTranslations } from "next-intl";
import { EmptySectionButton } from "@/components/common/EmptySection";
import { useCreateProjectCategoryModal } from "./CreateProjectCategoryModal";

export function ProjectCategoriesEmptySectionCreateButton() {
  const t = useTranslations(
    "projectCategories.ProjectCategoriesEmptySectionCreateButton",
  );

  const { onOpenChange: onModalOpenChange } = useCreateProjectCategoryModal();

  return (
    <EmptySectionButton onPress={() => onModalOpenChange(true)}>
      {t("label")}
    </EmptySectionButton>
  );
}
