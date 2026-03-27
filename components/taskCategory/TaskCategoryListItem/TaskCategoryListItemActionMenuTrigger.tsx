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
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useUpdateTaskCategoryModal } from "../UpdateTaskCategoryModal";
import { useTaskCategoryListItemPending } from "./useTaskCategoryListItemPending";

export type TaskCategoryListItemActionMenuTriggerProps = {
  taskCategoryId: number;
};

export function TaskCategoryListItemActionMenuTrigger({
  taskCategoryId,
}: TaskCategoryListItemActionMenuTriggerProps) {
  const t = useTranslations(
    "taskCategories.TaskCategoryListItemActionMenuTrigger",
  );

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State for update modal from context
  const { onOpenChange: onUpdateModalOpenChange } =
    useUpdateTaskCategoryModal();

  /**
   * Handles menu actions for a task category item
   * - If user is a guest, show guest modal
   * - Otherwise, open edit or delete modal based on action key
   */
  const handleAction = (key: Key) => {
    guestGuard(() => {
      const action = key.toString();
      if (action === "edit") {
        onUpdateModalOpenChange(true);
      } else if (action === "delete") {
        setIsDeleteModalOpen(true);
      }
    });
  };

  // Determine if any action on this task category item is pending (update or delete)
  const isPending = useTaskCategoryListItemPending(taskCategoryId);

  return (
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
  );
}
