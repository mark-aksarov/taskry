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
    //Remove the entity from the selection to prevent access to it
    removeSelected(projectCategoryId);

    //close modal before deleting
    onOpenChange(false);

    startTransition(() => action(projectCategoryId));
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
