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
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { useDeleteProjectCategories } from "../DeleteProjectCategoriesContext";

interface DeleteProjectCategoriesModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteProjectCategoriesModal({
  isOpen,
  onOpenChange,
}: DeleteProjectCategoriesModalProps) {
  const t = useTranslations("projectCategories.DeleteProjectCategoriesModal");

  const selected = useSelectedItems();
  const { action, setIds: setDeleteProjectCategoryIds } =
    useDeleteProjectCategories();
  const { clear: clearSelectedItems } = useSelectedItems();

  function handleDelete() {
    handleDeleteEntities(
      selected.ids,
      action,
      selected.ids,
      setDeleteProjectCategoryIds,
      clearSelectedItems,
      onOpenChange,
    );
  }

  return (
    <ConfirmModal
      data-test="delete-project-categories-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          count: selected.ids.length,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-project-categories-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
