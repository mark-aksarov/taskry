"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateCustomerCompanyModalProps {
  updateCustomerCompanyFormContainer: React.ReactNode;
}

export function UpdateCustomerCompanyModal({
  updateCustomerCompanyFormContainer,
}: UpdateCustomerCompanyModalProps) {
  const t = useTranslations("customers.UpdateCustomerCompanyModal");

  const { isOpen, onOpenChange } = useModal("updateCustomerCompany");

  return (
    <FormBaseModal
      data-test="update-customer-company-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {updateCustomerCompanyFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
