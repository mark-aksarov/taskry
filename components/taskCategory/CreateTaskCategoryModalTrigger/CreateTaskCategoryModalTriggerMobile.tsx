"use client";

import { useTranslations } from "next-intl";
import { CreateNewButtonMobile } from "@/components/common/CreateNewButton";
import { useCreateTaskCategoryTriggerPress } from "./useCreateTaskCategoryTriggerPress";
import { useCreateTaskCategoryTriggerDisabled } from "./useCreateTaskCategoryTriggerDisabled";

export function CreateTaskCategoryModalTriggerMobile() {
  const t = useTranslations("taskCategories.CreateTaskCategoryModalTrigger");

  const isDisabled = useCreateTaskCategoryTriggerDisabled();
  const handlePress = useCreateTaskCategoryTriggerPress();

  return (
    <CreateNewButtonMobile
      data-test="create-task-category-modal-trigger-mobile"
      aria-label={t("label")}
      onPress={handlePress}
      isDisabled={isDisabled}
    />
  );
}
