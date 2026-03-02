"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { useUpdateCustomer } from "../UpdateCustomerContext";

interface EditCustomerModalProps {
  editCustomerFormContainer: React.ReactNode;
}

export function EditCustomerModal({
  editCustomerFormContainer,
}: EditCustomerModalProps) {
  const t = useTranslations("customers.EditCustomerModal");

  const { isModalOpen, onModalOpenChange } = useUpdateCustomer();

  return (
    <FormBaseModal
      data-test="edit-customer-modal"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          {editCustomerFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
