"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useCreateCustomerModal } from "./CreateCustomerModalContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface NewCustomerModalProps {
  createCustomerFormContainer: React.ReactNode;
}

export function CreateCustomerModal({
  createCustomerFormContainer,
}: NewCustomerModalProps) {
  const t = useTranslations("customers.CreateCustomerModal");

  const { isOpen, onOpenChange } = useCreateCustomerModal();

  return (
    <FormBaseModal
      data-test="new-customer-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {createCustomerFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
