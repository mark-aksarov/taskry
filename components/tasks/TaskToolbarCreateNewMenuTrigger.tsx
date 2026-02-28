"use client";

import {
  ToolbarCreateNewModalTrigger,
  ToolbarCreateNewMenuTrigger,
} from "../common/Toolbar";

import { Key } from "react-aria";
import { useState } from "react";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { Blocks, CalendarCheck } from "lucide-react";
import { DialogHeader } from "@/components/ui/Dialog";
import { GuestModeModal } from "../common/GuestModeModal";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useCurrentUser } from "../common/CurrentUserContext";
import { NewTaskModal } from "@/components/tasks/NewTaskModal";
import { NewTaskCategoryModal } from "../taskCategory/NewTaskCategoryModal";

interface TaskToolbarCreateNewMenuTriggerProps {
  newTaskFormContainer: React.ReactNode;
  createTaskCategory: ActionFn<ActionState, FormData>;
}

export function TaskToolbarCreateNewMenuTrigger({
  newTaskFormContainer,
  createTaskCategory,
}: TaskToolbarCreateNewMenuTriggerProps) {
  const t = useTranslations("tasks.TaskToolbarCreateNewMenuTrigger");

  // Separate modal state for creating a task and a task category
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [openTaskCategoryModal, setOpenTaskCategoryModal] = useState(false);

  // Guest mode
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Menu actions: show guest modal, show task modal, show task category modal
  function handleAction(key: Key) {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "task") {
      setOpenTaskModal(true);
    } else if (key === "category") {
      setOpenTaskCategoryModal(true);
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

      {/* Modal for creating a new task */}
      <NewTaskModal
        newTaskFormContainer={newTaskFormContainer}
        isOpen={openTaskModal}
        onOpenChange={setOpenTaskModal}
      />

      {/* Modal for creating a new task category */}
      <NewTaskCategoryModal
        createTaskCategory={createTaskCategory}
        isOpen={openTaskCategoryModal}
        onOpenChange={setOpenTaskCategoryModal}
      />

      {/* Guest mode modal */}
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
