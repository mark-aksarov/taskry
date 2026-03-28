"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface NewCustomerModalProps {
  createCustomerFormContainer: React.ReactNode;
}

export function CreateCustomerModal({
  createCustomerFormContainer,
}: NewCustomerModalProps) {
  const t = useTranslations("customers.CreateCustomerModal");

  const { isOpen, onOpenChange } = useModal("createCustomer");

  return (
    <FormBaseModal
      data-test="create-customer-modal"
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
