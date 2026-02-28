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

interface BaseDeleteUserModalProps extends ModalProps {
  userFullName: string;
  onDelete: () => void;
}

export function BaseDeleteUserModal({
  userFullName,
  isOpen,
  onOpenChange,
  onDelete,
}: BaseDeleteUserModalProps) {
  const t = useTranslations("users.DeleteUserModal");

  return (
    <ConfirmModal
      data-test="delete-user-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          name: userFullName,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          data-test="delete-user-modal-confirm-button"
          label={t("deleteButton")}
          onConfirm={onDelete}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
