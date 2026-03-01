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
import { useCurrentUser } from "../../common/CurrentUserContext";
import { EditTaskCategoryModal } from "../EditTaskCategoryModal";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { DeleteTaskCategoryModal } from "../DeleteTaskCategoryModal";
import { useDeleteTaskCategoryTransition } from "../DeleteTaskCategoryTransitionContext";
import { useTaskCategoryListItemPending } from "./useTaskCategoryListItemPending";

export type TaskCategoryListItemActionMenuTriggerProps = {
  taskCategoryId: number;
  taskCategoryName: string;
  updateTaskCategory: ActionFn<ActionState, FormData>;
  deleteTaskCategory: ActionFn<ActionState, number[]>;
};

export function TaskCategoryListItemActionMenuTrigger({
  taskCategoryId,
  taskCategoryName,
  updateTaskCategory,
  deleteTaskCategory,
}: TaskCategoryListItemActionMenuTriggerProps) {
  const t = useTranslations(
    "taskCategories.TaskCategoryListItemActionMenuTrigger",
  );

  // Deleting the position
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

  //Pending state while deleting or updating
  const isPending = useTaskCategoryListItemPending(taskCategoryId);

  return (
    <>
      <ItemBaseActionMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => <ItemBaseActionMenuDialogHeader />}
        renderButton={() => (
          <ItemBaseActionMenuButton
            isPending={isPending}
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
        deleteTaskCategory={deleteTaskCategory}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
