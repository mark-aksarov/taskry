"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import {
  ActionFn,
  ActionState,
  DeleteCustomersPayload,
} from "@/lib/actions/types";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeading } from "@/components/ui/Dialog";
import { useDeleteModalActionState } from "@/components/common/BaseDeleteModal";

interface DeleteCustomersModalProps extends ModalProps {
  customerIds: number[];
  deleteCustomers: ActionFn<ActionState, DeleteCustomersPayload>;
}

export function DeleteCustomersModal({
  customerIds,
  isOpen,
  onOpenChange,
  deleteCustomers,
}: DeleteCustomersModalProps) {
  const t = useTranslations("customers.DeleteCustomersModal");

  const [_, action, isPending] = useDeleteModalActionState<number[]>({
    deleteEntity: deleteCustomers,
    onOpenChange,
  });

  const handleDelete = () => {
    startTransition(() => action(customerIds));
  };

  return (
    <ConfirmModal
      data-test="delete-customers-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          count: customerIds.length,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          isPending={isPending}
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-customers-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
