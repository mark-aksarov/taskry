"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { CreateCustomerFormSubmitButton } from "../CreateCustomerForm";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface NewCustomerModalProps {
  createCustomerFormContainer: React.ReactNode;
}

export function CreateCustomerModal({
  createCustomerFormContainer,
}: NewCustomerModalProps) {
  const t = useTranslations("dashboard.customers.CreateCustomerModal");

  const { isOpen, onOpenChange } = useModal("createCustomer");

  return (
    <FormBaseModal
      data-test="create-customer-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>{createCustomerFormContainer}</DialogBody>
        <DialogFooter>
          <CreateCustomerFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
