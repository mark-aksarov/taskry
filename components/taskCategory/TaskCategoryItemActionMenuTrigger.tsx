"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/components/common/ItemBase";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { EditTaskCategoryModal } from "./EditTaskCategoryModal";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { useDeleteTaskCategoryModal } from "./DeleteTaskCategoryModal";
import { ActionFn, ActionState } from "@/lib/actions/types";

export type TaskCategoryItemActionMenuTriggerProps = {
  guestMode: boolean;
  taskCategoryId: number;
  taskCategoryName: string;
  updateTaskCategory: ActionFn<ActionState, FormData>;
};

export function TaskCategoryItemActionMenuTrigger({
  guestMode,
  taskCategoryId,
  taskCategoryName,
  updateTaskCategory,
}: TaskCategoryItemActionMenuTriggerProps) {
  const t = useTranslations("taskCategories.TaskCategoryItemActionMenuTrigger");

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the task category
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Modal state for deleting the task category
  const { setState: setDeleteTaskCategoryModalState } =
    useDeleteTaskCategoryModal();

  // Handle menu actions
  const handleAction = (key: Key) => {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();
    if (action === "edit") {
      setIsEditModalOpen(true);
    } else if (action === "delete") {
      setDeleteTaskCategoryModalState({
        isOpen: true,
        entityId: taskCategoryId,
        entityName: taskCategoryName,
      });
    }
  };

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
            data-test="task-category-item-action-menu-trigger"
            data-id={taskCategoryId}
          />
        )}
      >
        <Item textValue={t("edit")} key="edit">
          <Pencil size={16} /> {t("edit")}
        </Item>
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} /> {t("delete")}
        </Item>
      </ItemBaseActionMenuTrigger>

      <EditTaskCategoryModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        taskCategoryId={taskCategoryId}
        taskCategoryName={taskCategoryName}
        updateTaskCategory={updateTaskCategory}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
