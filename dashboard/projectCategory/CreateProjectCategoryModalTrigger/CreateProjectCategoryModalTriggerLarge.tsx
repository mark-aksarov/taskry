"use client";

import { useTranslations } from "next-intl";
import { CreateNewButtonLarge } from "@/dashboard/common/CreateNewButton";
import { useCreateProjectCategoryTriggerPress } from "./useCreateProjectCategoryTriggerPress";
import { useCreateProjectCategoryTriggerDisabled } from "./useCreateProjectCategoryTriggerDisabled";

export function CreateProjectCategoryModalTriggerLarge() {
  const t = useTranslations(
    "dashboard.projectCategories.CreateProjectCategoryModalTrigger",
  );

  const isDisabled = useCreateProjectCategoryTriggerDisabled();
  const handlePress = useCreateProjectCategoryTriggerPress();

  return (
    <CreateNewButtonLarge
      data-test="create-project-category-modal-trigger-large"
      label={t("label")}
      onPress={handlePress}
      isDisabled={isDisabled}
    />
  );
}
