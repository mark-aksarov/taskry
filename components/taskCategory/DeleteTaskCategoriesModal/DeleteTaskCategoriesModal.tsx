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
import { handleDeleteEntities } from "@/lib/utils/handleDeleteEntities";
import { useDeleteTaskCategories } from "../DeleteTaskCategoriesContext";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface DeleteTaskCategoriesModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteTaskCategoriesModal({
  isOpen,
  onOpenChange,
}: DeleteTaskCategoriesModalProps) {
  const t = useTranslations("taskCategories.DeleteTaskCategoriesModal");

  const { ids: selectedIds, clear: clearSelectedItems } = useSelectedItems();
  const { action, setIds: setDeleteProjectCategoryIds } =
    useDeleteTaskCategories();

  function handleDelete() {
    handleDeleteEntities(
      selectedIds,
      action,
      selectedIds,
      setDeleteProjectCategoryIds,
      clearSelectedItems,
      onOpenChange,
    );
  }

  return (
    <ConfirmModal
      data-test="delete-task-categories-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          count: selectedIds.length,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-task-categories-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
