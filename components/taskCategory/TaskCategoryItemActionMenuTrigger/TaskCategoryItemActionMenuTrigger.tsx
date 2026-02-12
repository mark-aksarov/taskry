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
import { ActionFn, ActionState } from "@/lib/actions/types";
import { EditTaskCategoryModal } from "../EditTaskCategoryModal";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { DeleteTaskCategoryModal } from "../DeleteTaskCategoryModal";

export type TaskCategoryItemActionMenuTriggerProps = {
  guestMode: boolean;
  taskCategoryId: number;
  taskCategoryName: string;
  editTaskCategoryForm: React.ReactNode;
  deleteTaskCategories: ActionFn<ActionState, number[]>;
};

export function TaskCategoryItemActionMenuTrigger({
  guestMode,
  taskCategoryId,
  taskCategoryName,
  editTaskCategoryForm,
  deleteTaskCategories,
}: TaskCategoryItemActionMenuTriggerProps) {
  const t = useTranslations("taskCategories.TaskCategoryItemActionMenuTrigger");

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the task category
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Modal state for deleting the task category
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
      setIsDeleteModalOpen(true);
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

      <DeleteTaskCategoryModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        taskCategoryId={taskCategoryId}
        taskCategoryName={taskCategoryName}
        deleteTaskCategories={deleteTaskCategories}
      />

      <EditTaskCategoryModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        editTaskCategoryForm={editTaskCategoryForm}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
