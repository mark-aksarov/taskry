"use client";

import { useTranslations } from "next-intl";
import { CreateNewButtonMobile } from "@/components/common/CreateNewButton";
import { useCreateProjectCategoryTriggerPress } from "./useCreateProjectCategoryTriggerPress";
import { useCreateProjectCategoryTriggerDisabled } from "./useCreateProjectCategoryTriggerDisabled";

export function CreateProjectCategoryModalTriggerMobile() {
  const t = useTranslations(
    "projectCategories.CreateProjectCategoryModalTrigger",
  );

  const isDisabled = useCreateProjectCategoryTriggerDisabled();
  const handlePress = useCreateProjectCategoryTriggerPress();

  return (
    <CreateNewButtonMobile
      data-test="create-project-category-modal-trigger-mobile"
      aria-label={t("label")}
      onPress={handlePress}
      isDisabled={isDisabled}
    />
  );
}
