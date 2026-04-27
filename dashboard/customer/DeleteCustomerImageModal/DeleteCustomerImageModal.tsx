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
import { useClearCustomerImageUrl } from "../ClearCustomerImageUrlContext";

interface DeleteCustomerImageModalProps {
  customerId: number;
  customerFullName: string;
}

export function DeleteCustomerImageModal({
  customerId,
  customerFullName,
}: DeleteCustomerImageModalProps) {
  const { action } = useClearCustomerImageUrl();
  const { isOpen, onOpenChange } = useModal("deleteCustomerImage");

  function handleDelete() {
    //close modal before deleting
    onOpenChange(false);

    startTransition(() => action(customerId));
  }

  const t = useTranslations("dashboard.customers.DeleteCustomerImageModal");

  return (
    <ConfirmModal
      data-test="delete-customer-image-modal"
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
          data-test="delete-customer-image-modal-confirm-button"
          label={t("deleteButton")}
          onConfirm={handleDelete}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
