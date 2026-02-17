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
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeading } from "@/components/ui/Dialog";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useDeleteModalActionState } from "@/components/common/BaseDeleteModal";

interface DeleteCustomerModalProps extends ModalProps {
  customerId: number;
  customerFullName: string;
  deleteCustomer: ActionFn<ActionState, number[]>;
}

export function DeleteCustomerModal({
  customerId,
  customerFullName,
  isOpen,
  onOpenChange,
  deleteCustomer,
}: DeleteCustomerModalProps) {
  const t = useTranslations("customers.DeleteCustomerModal");

  const [_, action, isPending] = useDeleteModalActionState<number[]>({
    deleteEntity: deleteCustomer,
    onOpenChange,
  });

  const handleDelete = () => {
    startTransition(() => action([customerId]));
  };

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
          isPending={isPending}
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-customer-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
