"use client";

import {
  ToolbarCreateNewModalTrigger,
  ToolbarCreateNewMenuTrigger,
} from "../common/Toolbar";

import { Key } from "react-aria";
import { useState } from "react";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { useCreateTask } from "./CreateTaskContext";
import { Blocks, CalendarCheck } from "lucide-react";
import { DialogHeader } from "@/components/ui/Dialog";
import { GuestModeModal } from "../common/GuestModeModal";
import { useCurrentUser } from "../common/CurrentUserContext";
import { useCreateTaskCategory } from "../taskCategory/CreateTaskCategoryContext";

export function TaskToolbarCreateNewMenuTrigger() {
  const t = useTranslations("tasks.TaskToolbarCreateNewMenuTrigger");

  // If the user is a guest, show the guest mode modal instead of allowing creation
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Create task category: action state + form modal state
  const {
    isPending: isCreateTaskCategoryPending,
    onModalOpenChange: onTaskCategoryModalOpenChange,
  } = useCreateTaskCategory();

  // Create task: action state + form modal state
  const {
    isPending: isCreateTaskPending,
    onModalOpenChange: onTaskModalOpenChange,
  } = useCreateTask();

  /**
   * Handles menu actions for creating a task or task category
   * - If user is a guest, show guest modal
   * - Otherwise, open create task category modal or create task modal
   */
  function handleAction(key: Key) {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "task") {
      onTaskModalOpenChange(true);
    } else if (key === "category") {
      onTaskCategoryModalOpenChange(true);
    }
  }

  return (
    <>
      <ToolbarCreateNewMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
        )}
        renderButton={() => (
          <ToolbarCreateNewModalTrigger
            data-test="task-toolbar-create-new-menu-trigger"
            label={t("label")}
            isDisabled={
              // Block user interactions while a task category or task is being created
              isCreateTaskCategoryPending || isCreateTaskPending
            }
          />
        )}
      >
        <Item textValue={t("items.task")} key="task">
          <CalendarCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.task")}
        </Item>
        <Item textValue={t("items.category")} key="category">
          <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("items.category")}
        </Item>
      </ToolbarCreateNewMenuTrigger>

      {/* Guest mode modal */}
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
