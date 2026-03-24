"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useUpdateCustomer } from "../UpdateCustomerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateCustomerModalProps {
  updateCustomerFormContainer: React.ReactNode;
}

export function UpdateCustomerModal({
  updateCustomerFormContainer,
}: UpdateCustomerModalProps) {
  const t = useTranslations("customers.UpdateCustomerModal");

  const { isModalOpen, onModalOpenChange } = useUpdateCustomer();

  return (
    <FormBaseModal
      data-test="edit-customer-modal"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {updateCustomerFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
