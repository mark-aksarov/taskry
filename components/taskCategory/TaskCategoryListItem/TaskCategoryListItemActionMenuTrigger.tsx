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
import { UpdateTaskCategoryModal } from "../UpdateTaskCategoryModal";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { DeleteTaskCategoryModal } from "../DeleteTaskCategoryModal";
import { useUpdateTaskCategory } from "../UpdateTaskCategoryContext";
import { useTaskCategoryListItemPending } from "./useTaskCategoryListItemPending";

export type TaskCategoryListItemActionMenuTriggerProps = {
  taskCategoryId: number;
  taskCategoryName: string;
};

export function TaskCategoryListItemActionMenuTrigger({
  taskCategoryId,
  taskCategoryName,
}: TaskCategoryListItemActionMenuTriggerProps) {
  const t = useTranslations(
    "taskCategories.TaskCategoryListItemActionMenuTrigger",
  );

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State for edit modal from context
  const { onModalOpenChange: onEditModalOpenChange } = useUpdateTaskCategory();

  /**
   * Handles menu actions for a task category item
   * - If user is a guest, show guest modal
   * - Otherwise, open edit or delete modal based on action key
   */
  const handleAction = (key: Key) => {
    guestGuard(() => {
      const action = key.toString();
      if (action === "edit") {
        onEditModalOpenChange(true);
      } else if (action === "delete") {
        setIsDeleteModalOpen(true);
      }
    });
  };

  // Determine if any action on this task category item is pending (update or delete)
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

      {/* Modals for editing, deleting, and guest mode */}
      <UpdateTaskCategoryModal
        taskCategoryId={taskCategoryId}
        taskCategoryName={taskCategoryName}
      />

      <DeleteTaskCategoryModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        taskCategoryId={taskCategoryId}
        taskCategoryName={taskCategoryName}
      />
    </>
  );
}
