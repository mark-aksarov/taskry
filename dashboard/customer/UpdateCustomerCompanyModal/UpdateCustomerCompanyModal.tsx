"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";
import { UpdateCustomerCompanyFormSubmitButton } from "../UpdateCustomerCompanyForm";

interface UpdateCustomerCompanyModalProps {
  updateCustomerCompanyFormContainer: React.ReactNode;
}

export function UpdateCustomerCompanyModal({
  updateCustomerCompanyFormContainer,
}: UpdateCustomerCompanyModalProps) {
  const t = useTranslations("dashboard.customers.UpdateCustomerCompanyModal");

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
        <DialogBody>{updateCustomerCompanyFormContainer}</DialogBody>
        <DialogFooter>
          <UpdateCustomerCompanyFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
