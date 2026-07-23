"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/common/ConfirmModal";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { DialogHeading } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { useClearClientImageUrl } from "../ClearClientImageUrlContext";

interface DeleteClientImageModalProps {
  clientId: number;
  clientFullName: string;
}

export function DeleteClientImageModal({
  clientId,
  clientFullName,
}: DeleteClientImageModalProps) {
  const { action } = useClearClientImageUrl();
  const { isOpen, onOpenChange } = useModal("deleteClientImage");

  function handleDelete() {
    //close modal before deleting
    onOpenChange(false);

    startTransition(() => action(clientId));
  }

  const t = useTranslations("dashboard.clients.DeleteClientImageModal");

  return (
    <ConfirmModal
      data-test="delete-client-image-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          name: clientFullName,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          data-test="delete-client-image-modal-confirm-button"
          label={t("deleteButton")}
          onConfirm={handleDelete}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
