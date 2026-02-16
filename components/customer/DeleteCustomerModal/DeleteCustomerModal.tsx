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

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeading } from "@/components/ui/Dialog";
import { startTransition, useActionState } from "react";
import { useErrorToast } from "@/lib/hooks/useErrorToast";

const initialState: ActionState = {
  status: null,
};

interface DeleteCustomerModalProps extends ModalProps {
  customerId: number;
  customerFullName: string;
  deleteCustomer: ActionFn<ActionState, DeleteCustomersPayload>;
}

export function DeleteCustomerModal({
  customerId,
  customerFullName,
  isOpen,
  onOpenChange,
  deleteCustomer,
}: DeleteCustomerModalProps) {
  const t = useTranslations("customers.DeleteCustomerModal");

  // show error toast when delete action fails
  const { close: closeErrorToast, add: addErrorToast } = useErrorToast();

  const [_, action, isPending] = useActionState(
    async (prevState: ActionState, payload: DeleteCustomersPayload) => {
      // call server action to perform delete action
      const newState = await deleteCustomer(prevState, payload);

      // close error toast
      closeErrorToast();

      // close modal
      if (newState.status === "success") {
        onOpenChange?.(false);
      }
      // show error toast
      else if (newState.status === "error" && newState.message) {
        addErrorToast(newState.message);
      }

      return newState;
    },
    initialState,
  );

  // call delete action with payload
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
