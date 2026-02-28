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
import { EditTaskCategoryModal } from "./EditTaskCategoryModal";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { DeleteTaskCategoryModal } from "./DeleteTaskCategoryModal";
import { useDeleteTaskCategoryContext } from "./DeleteTaskCategoryContext";
import { useCurrentUser } from "../common/CurrentUserContext";

export type TaskCategoryItemActionMenuTriggerProps = {
  taskCategoryId: number;
  taskCategoryName: string;
  updateTaskCategory: ActionFn<ActionState, FormData>;
};

export function TaskCategoryItemActionMenuTrigger({
  taskCategoryId,
  taskCategoryName,
  updateTaskCategory,
}: TaskCategoryItemActionMenuTriggerProps) {
  const t = useTranslations("taskCategories.TaskCategoryItemActionMenuTrigger");

  // Deleting the position
  const { isPending: isDeletePending } = useDeleteTaskCategoryContext();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Guest mode
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the task category
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Handle menu actions
  const handleAction = (key: Key) => {
    if (isGuest) {
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
            isPending={isDeletePending}
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

      <DeleteTaskCategoryModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        taskCategoryId={taskCategoryId}
        taskCategoryName={taskCategoryName}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
