"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/dashboard/common/ConfirmModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/ui/Modal";
import { DialogHeading } from "@/ui/Dialog";

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
  const t = useTranslations("dashboard.users.DeleteUserModal");

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
