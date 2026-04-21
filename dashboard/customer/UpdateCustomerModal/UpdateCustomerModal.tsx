"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { UpdateCustomerFormSubmitButton } from "../UpdateCustomerForm";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateCustomerModalProps {
  updateCustomerFormContainer: React.ReactNode;
}

export function UpdateCustomerModal({
  updateCustomerFormContainer,
}: UpdateCustomerModalProps) {
  const t = useTranslations("dashboard.customers.UpdateCustomerModal");

  const { isOpen, onOpenChange } = useModal("updateCustomer");

  return (
    <FormBaseModal
      data-test="update-customer-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>{updateCustomerFormContainer}</DialogBody>
        <DialogFooter>
          <UpdateCustomerFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
