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

interface BaseDeleteCustomerModalProps extends ModalProps {
  onDelete: () => void;
  customerFullName: string;
}

export function BaseDeleteCustomerModal({
  onDelete,
  customerFullName,
  isOpen,
  onOpenChange,
}: BaseDeleteCustomerModalProps) {
  const t = useTranslations("dashboard.customers.DeleteCustomerModal");

  return (
    <ConfirmModal
      data-test="delete-customer-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          name: customerFullName,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("deleteButton")}
          onConfirm={onDelete}
          data-test="delete-customer-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
