"use client";

import { useTranslations } from "next-intl";
import { useModal } from "../../common/ModalManagerContext";
import { EmptySectionButton } from "@/dashboard/common/EmptySection";

export function ProjectCategoriesEmptySectionCreateButton() {
  const t = useTranslations(
    "dashboard.projectCategories.ProjectCategoriesEmptySectionCreateButton",
  );

  const { onOpenChange: onModalOpenChange } = useModal("createProjectCategory");

  return (
    <EmptySectionButton
      data-test="project-categories-empty-section-create-button"
      onPress={() => onModalOpenChange(true)}
    >
      {t("label")}
    </EmptySectionButton>
  );
}
