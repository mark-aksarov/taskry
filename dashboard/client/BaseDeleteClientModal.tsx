"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/common/ConfirmModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/ui/Modal";
import { DialogHeading } from "@/ui/Dialog";

interface BaseDeleteClientModalProps extends ModalProps {
  onDelete: () => void;
  clientFullName: string;
}

export function BaseDeleteClientModal({
  onDelete,
  clientFullName,
  isOpen,
  onOpenChange,
}: BaseDeleteClientModalProps) {
  const t = useTranslations("dashboard.clients.DeleteClientModal");

  return (
    <ConfirmModal
      data-test="delete-client-modal"
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
          label={t("deleteButton")}
          onConfirm={onDelete}
          data-test="delete-client-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
