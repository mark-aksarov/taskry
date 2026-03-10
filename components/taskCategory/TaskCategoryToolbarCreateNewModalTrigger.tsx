"use client";

import { useTranslations } from "next-intl";
import { useCurrentUser } from "../common/CurrentUserContext";
import { useCreateTaskCategory } from "./CreateTaskCategoryContext";
import { useGuestModeModal } from "@/components/common/GuestModeModal";
import { ToolbarCreateNewModalTrigger } from "@/components/common/Toolbar";

export function TaskCategoryToolbarCreateNewModalTrigger() {
  const t = useTranslations(
    "taskCategories.TaskCategoryToolbarCreateNewModalTrigger",
  );

  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useGuestModeModal();

  // Create task category action and modal states
  const {
    isPending: isCreateTaskCategoryPending,
    onModalOpenChange: onTaskCategoryModalOpenChange,
  } = useCreateTaskCategory();

  /**
   * Handles menu actions for creating a task category
   * - If user is a guest, show guest modal
   * - Otherwise, open create task category modal
   */
  const handlePress = () => {
    if (isGuest) {
      onGuestModeModalOpenChange(true);
      return;
    }

    onTaskCategoryModalOpenChange(true);
  };

  return (
    <ToolbarCreateNewModalTrigger
      data-test="task-category-toolbar-create-new-modal-trigger"
      label={t("label")}
      onPress={handlePress}
      // Block creating another task category until the current request completes
      isDisabled={isCreateTaskCategoryPending}
    />
  );
}
