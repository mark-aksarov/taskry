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
import { useDeletePositions } from "../DeletePositionsContext";
import { handleDeleteEntities } from "@/lib/utils/handleDeleteEntities";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface DeletePositionsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeletePositionsModal({
  isOpen,
  onOpenChange,
}: DeletePositionsModalProps) {
  const t = useTranslations("positions.DeletePositionsModal");

  const { ids: selectedIds, clear: clearSelectedItems } = useSelectedItems();
  const { action, setIds: setDeletePositionIds } = useDeletePositions();

  function handleDelete() {
    handleDeleteEntities(
      selectedIds,
      action,
      selectedIds,
      setDeletePositionIds,
      clearSelectedItems,
      onOpenChange,
    );
  }

  return (
    <ConfirmModal
      data-test="delete-positions-modal"
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
          data-test="delete-positions-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
