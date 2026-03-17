"use client";

import { useTranslations } from "next-intl";
import { CreateNewButtonLarge } from "@/components/common/CreateNewButton";
import { useCreateTaskCategoryTriggerPress } from "./useCreateTaskCategoryTriggerPress";
import { useCreateTaskCategoryTriggerDisabled } from "./useCreateTaskCategoryTriggerDisabled";

export function CreateTaskCategoryModalTriggerLarge() {
  const t = useTranslations("taskCategories.CreateTaskCategoryModalTrigger");

  const isDisabled = useCreateTaskCategoryTriggerDisabled();
  const handlePress = useCreateTaskCategoryTriggerPress();

  return (
    <CreateNewButtonLarge
      data-test="create-task-category-modal-trigger-large"
      label={t("label")}
      onPress={handlePress}
      isDisabled={isDisabled}
    />
  );
}
