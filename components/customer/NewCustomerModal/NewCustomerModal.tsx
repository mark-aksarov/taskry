"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { useCreateCustomer } from "../CreateCustomerContext";

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
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          {newCustomerFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
