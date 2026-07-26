"use client";

import {
  ItemBaseActionMenuButton,
  ItemBaseActionMenuTrigger,
  ItemBaseActionMenuDialogHeader,
} from "@/dashboard/common/ItemBase";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { useModal } from "@/common/ModalManagerContext";
import { useTaskCategoryListItemPending } from "./useTaskCategoryListItemPending";

export type TaskCategoryListItemActionMenuTriggerProps = {
  taskCategoryId: number;
};

export function TaskCategoryListItemActionMenuTrigger({
  taskCategoryId,
}: TaskCategoryListItemActionMenuTriggerProps) {
  const t = useTranslations(
    "dashboard.taskCategories.TaskCategoryListItemActionMenuTrigger",
  );

  // Delete confirmation modal state
  const { onOpenChange: onDeleteModalOpenChange } =
    useModal("deleteTaskCategory");

  // State for update modal from context
  const { onOpenChange: onUpdateModalOpenChange } =
    useModal("updateTaskCategory");

  /**
   * Open edit or delete modal based on action key
   */
  const handleAction = (key: Key) => {
    const action = key.toString();
    if (action === "edit") {
      onUpdateModalOpenChange(true);
    } else if (action === "delete") {
      onDeleteModalOpenChange(true);
    }
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
        <Pencil /> {t("edit")}
      </Item>
      <Item textValue={t("delete")} key="delete">
        <Trash /> {t("delete")}
      </Item>
    </ItemBaseActionMenuTrigger>
  );
}
