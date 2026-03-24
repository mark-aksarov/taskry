"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";
import { useUpdateCustomerModal } from "./UpdateCustomerModalContext";

interface UpdateCustomerModalProps {
  updateCustomerFormContainer: React.ReactNode;
}

export function UpdateCustomerModal({
  updateCustomerFormContainer,
}: UpdateCustomerModalProps) {
  const t = useTranslations("customers.UpdateCustomerModal");

  const { isOpen, onOpenChange } = useUpdateCustomerModal();

  return (
    <FormBaseModal
      data-test="update-customer-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
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
