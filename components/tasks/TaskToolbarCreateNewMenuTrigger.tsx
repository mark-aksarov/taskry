"use client";

import {
  ToolbarCreateNewButton,
  ToolbarCreateNewMenuTrigger,
} from "../common/Toolbar";

import { Key } from "react-aria";
import { useState } from "react";
import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { Blocks, CalendarCheck } from "lucide-react";
import { DialogHeader } from "@/components/ui/Dialog";
import { GuestModeModal } from "../common/GuestModeModal";
import { NewTaskCategoryModal } from "./NewTaskCategoryModal";
import { NewTaskModal } from "@/components/tasks/NewTaskModal";

interface TaskToolbarCreateNewMenuTriggerProps {
  guestMode: boolean;
  newTaskFormContainer: React.ReactNode;
  newTaskCategoryForm: React.ReactNode;
}

export function TaskToolbarCreateNewMenuTrigger({
  guestMode,
  newTaskFormContainer,
  newTaskCategoryForm,
}: TaskToolbarCreateNewMenuTriggerProps) {
  const t = useTranslations("tasks.TaskToolbarCreateNewMenuTrigger");

  // Separate modal state for creating a task and a task category
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [openTaskCategoryModal, setOpenTaskCategoryModal] = useState(false);

  // Guest mode
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Menu actions: show guest modal, show task modal, show task category modal
  function handleAction(key: Key) {
    if (guestMode) {
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
          <ToolbarCreateNewButton
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
        newTaskCategoryForm={newTaskCategoryForm}
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
