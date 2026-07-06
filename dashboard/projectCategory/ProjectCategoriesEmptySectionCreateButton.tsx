"use client";

import { useTranslations } from "next-intl";
import { useModal } from "../../common/ModalManagerContext";
import { FallbackSectionButton } from "@/common/FallbackSection";

export function ProjectCategoriesEmptySectionCreateButton() {
  const t = useTranslations(
    "dashboard.projectCategories.ProjectCategoriesEmptySectionCreateButton",
  );

  const { onOpenChange: onModalOpenChange } = useModal("createProjectCategory");

  return (
    <FallbackSectionButton
      data-test="project-categories-empty-section-create-button"
      onPress={() => onModalOpenChange(true)}
    >
      {t("label")}
    </FallbackSectionButton>
  );
}
