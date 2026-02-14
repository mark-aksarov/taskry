"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { ToolbarCreateNewModalTrigger } from "@/components/common/Toolbar";
import { NewTaskCategoryModal } from "../NewTaskCategoryModal";

interface TaskCategoryToolbarCreateNewModalTriggerProps {
  guestMode: boolean;
  newTaskCategoryForm: React.ReactNode;
}

export function TaskCategoryToolbarCreateNewModalTrigger({
  guestMode,
  newTaskCategoryForm,
}: TaskCategoryToolbarCreateNewModalTriggerProps) {
  const t = useTranslations(
    "taskCategories.TaskCategoryToolbarCreateNewModalTrigger",
  );

  // Create new task category modal
  const [isTaskCategoryModalOpen, setIsTaskCategoryModalOpen] = useState(false);

  // Guest mode
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  const handlePress = () => {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    setIsTaskCategoryModalOpen(true);
  };

  return (
    <>
      <ToolbarCreateNewModalTrigger
        data-test="task-category-toolbar-create-new-button"
        label={t("label")}
        onPress={handlePress}
      />
      <NewTaskCategoryModal
        isOpen={isTaskCategoryModalOpen}
        onOpenChange={setIsTaskCategoryModalOpen}
        newTaskCategoryForm={newTaskCategoryForm}
      />
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
