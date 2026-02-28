"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { NewTaskCategoryModal } from "./NewTaskCategoryModal";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { ToolbarCreateNewModalTrigger } from "@/components/common/Toolbar";
import { useCurrentUser } from "../common/CurrentUserContext";

interface TaskCategoryToolbarCreateNewModalTriggerProps {
  createTaskCategory: ActionFn<ActionState, FormData>;
}

export function TaskCategoryToolbarCreateNewModalTrigger({
  createTaskCategory,
}: TaskCategoryToolbarCreateNewModalTriggerProps) {
  const t = useTranslations(
    "taskCategories.TaskCategoryToolbarCreateNewModalTrigger",
  );

  // Create new task category modal
  const [isTaskCategoryModalOpen, setIsTaskCategoryModalOpen] = useState(false);

  // Guest mode
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  const handlePress = () => {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    setIsTaskCategoryModalOpen(true);
  };

  return (
    <>
      <ToolbarCreateNewModalTrigger
        data-test="task-category-toolbar-create-new-modal-trigger"
        label={t("label")}
        onPress={handlePress}
      />
      <NewTaskCategoryModal
        isOpen={isTaskCategoryModalOpen}
        onOpenChange={setIsTaskCategoryModalOpen}
        createTaskCategory={createTaskCategory}
      />
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
