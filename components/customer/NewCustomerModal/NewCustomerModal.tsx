"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useCreateCustomer } from "../CreateCustomerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface NewCustomerModalProps {
  newCustomerFormContainer: React.ReactNode;
}

export function NewCustomerModal({
  newCustomerFormContainer,
}: NewCustomerModalProps) {
  const t = useTranslations("customers.NewCustomerModal");

  const { isModalOpen, onModalOpenChange } = useCreateCustomer();

  return (
    <FormBaseModal
      data-test="new-customer-modal"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {newCustomerFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
