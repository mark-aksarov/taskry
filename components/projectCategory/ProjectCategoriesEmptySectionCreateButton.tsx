"use client";

import { useTranslations } from "next-intl";
import { useModal } from "../common/ModalManagerContext";
import { EmptySectionButton } from "@/components/common/EmptySection";

export function ProjectCategoriesEmptySectionCreateButton() {
  const t = useTranslations(
    "projectCategories.ProjectCategoriesEmptySectionCreateButton",
  );

  const { onOpenChange: onModalOpenChange } = useModal(
    "deleteProjectCategories",
  );

  return (
    <EmptySectionButton onPress={() => onModalOpenChange(true)}>
      {t("label")}
    </EmptySectionButton>
  );
}
