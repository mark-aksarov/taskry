"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import { useTranslations } from "next-intl";
import { DialogHeading } from "@/components/ui/Dialog";
import { handleDeleteEntity } from "@/lib/utils/handleDeleteEntity";
import { useDeleteTaskCategory } from "../DeleteTaskCategoryContext";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface DeleteTaskCategoryModalProps {
  taskCategoryId: number;
  taskCategoryName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteTaskCategoryModal({
  taskCategoryId,
  taskCategoryName,
  isOpen,
  onOpenChange,
}: DeleteTaskCategoryModalProps) {
  const t = useTranslations("taskCategories.DeleteTaskCategoryModal");

  const { action } = useDeleteTaskCategory();

  const { remove: removeSelected } = useSelectedItems();

  function handleDelete() {
    handleDeleteEntity(
      removeSelected,
      action,
      [taskCategoryId],
      taskCategoryId,
      onOpenChange,
    );
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
