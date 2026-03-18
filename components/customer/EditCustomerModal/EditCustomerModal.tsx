"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useUpdateCustomer } from "../UpdateCustomerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

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
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {editCustomerFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
