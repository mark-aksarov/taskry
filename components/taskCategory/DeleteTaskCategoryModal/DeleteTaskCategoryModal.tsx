"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { DialogHeading } from "@/components/ui/Dialog";
import { useDeleteTaskCategory } from "../DeleteTaskCategoryContext";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { useDeleteTaskCategoryModal } from "./DeleteTaskCategoryModalContext";

interface DeleteTaskCategoryModalProps {
  taskCategoryId: number;
  taskCategoryName: string;
}

export function DeleteTaskCategoryModal({
  taskCategoryId,
  taskCategoryName,
}: DeleteTaskCategoryModalProps) {
  const t = useTranslations("taskCategories.DeleteTaskCategoryModal");

  const { action } = useDeleteTaskCategory();
  const { isOpen, onOpenChange } = useDeleteTaskCategoryModal();

  const { remove: removeSelected } = useSelectedItems();

  function handleDelete() {
    //Remove the entity from the selection to prevent access to it
    removeSelected(taskCategoryId);

    //close modal before deleting
    onOpenChange(false);

    startTransition(() => action(taskCategoryId));
  }

  return (
    <ConfirmModal
      data-test="delete-task-category-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          name: taskCategoryName,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-task-category-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
