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
import { useDeleteProjectCategory } from "../DeleteProjectCategoryContext";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface DeleteProjectCategoryModalProps {
  projectCategoryId: number;
  projectCategoryName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteProjectCategoryModal({
  projectCategoryId,
  projectCategoryName,
  isOpen,
  onOpenChange,
}: DeleteProjectCategoryModalProps) {
  const t = useTranslations("projectCategories.DeleteProjectCategoryModal");

  const { action } = useDeleteProjectCategory();

  const { remove: removeSelected } = useSelectedItems();

  function handleDelete() {
    handleDeleteEntity(
      removeSelected,
      action,
      [projectCategoryId],
      projectCategoryId,
      onOpenChange,
    );
  }

  return (
    <ConfirmModal
      data-test="delete-project-category-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          name: projectCategoryName,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-project-category-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
