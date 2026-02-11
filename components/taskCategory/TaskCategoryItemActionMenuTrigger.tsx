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
import { GuestModeModal } from "@/components/common/GuestModeModal";

export type TaskCategoryItemActionMenuTriggerProps = {
  guestMode: boolean;
  taskId: number;
  taskCategoryName: string;
};

export function TaskCategoryItemActionMenuTrigger({
  guestMode,
  taskId,
  taskCategoryName,
}: TaskCategoryItemActionMenuTriggerProps) {
  const t = useTranslations("taskCategories.TaskCategoryItemActionMenuTrigger");

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the task category
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  // Modal state for deleting the task category
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  // Handle menu actions
  const handleAction = (key: Key) => {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    const action = key.toString();
    if (action === "edit") {
      setIsOpenEditModal(true);
    } else if (action === "delete") {
      setIsOpenDeleteModal(true);
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
            data-id={taskId}
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

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
