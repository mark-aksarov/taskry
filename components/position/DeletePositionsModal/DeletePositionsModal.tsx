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

  const selected = useSelectedItems();
  const { action, setIds: setDeletePositionIds } = useDeletePositions();
  const { clear: clearSelectedItems } = useSelectedItems();

  function handleDelete() {
    handleDeleteEntities(
      selected.ids,
      action,
      selected.ids,
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
          count: selected.ids.length,
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
