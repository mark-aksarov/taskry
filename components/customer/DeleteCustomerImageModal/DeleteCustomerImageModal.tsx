"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { DialogHeading } from "@/components/ui/Dialog";
import { useDeleteCustomerImage } from "../DeleteCustomerImageContext";

interface DeleteCustomerImageModalProps {
  customerId: number;
  customerFullName: string;
}

export function DeleteCustomerImageModal({
  customerId,
  customerFullName,
}: DeleteCustomerImageModalProps) {
  const { action, isModalOpen, onModalOpenChange } = useDeleteCustomerImage();

  function handleDelete() {
    //close modal before deleting
    onModalOpenChange(false);

    startTransition(() => action(customerId));
  }

  const t = useTranslations("customers.DeleteCustomerImageModal");

  return (
    <ConfirmModal
      data-test="delete-customer-image-modal"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
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
          data-test="delete-customer-image-modal-confirm-button"
          label={t("deleteButton")}
          onConfirm={handleDelete}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
