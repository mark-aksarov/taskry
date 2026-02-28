"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeading } from "@/components/ui/Dialog";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useDeletePositions } from "../DeletePositionsContext";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { useDeleteEntityActionState } from "@/lib/hooks/useDeleteEntityActionState";

interface DeletePositionsModalProps extends ModalProps {
  positionIds: number[];
  deletePositions: ActionFn<ActionState, number[]>;
}

export function DeletePositionsModal({
  positionIds,
  isOpen,
  onOpenChange,
  deletePositions,
}: DeletePositionsModalProps) {
  const t = useTranslations("positions.DeletePositionsModal");

  const { startTransition, setPositionIds: setDeletePositionIds } =
    useDeletePositions();

  const [, action] = useDeleteEntityActionState({
    deleteEntity: deletePositions,
    successMessage: t("successMessage"),
  });

  const { clear: clearSelectedItems } = useSelectedItems();

  function handleDelete() {
    //close modal before deleting
    onOpenChange?.(false);

    // Clear selected items
    clearSelectedItems();

    // Used to show an overlay on the selected positions
    setDeletePositionIds(positionIds);
    startTransition(() => action(positionIds));
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
          count: positionIds.length,
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
