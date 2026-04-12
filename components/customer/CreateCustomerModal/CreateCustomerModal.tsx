"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { CreateCustomerFormSubmitButton } from "../CreateCustomerForm";
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
        <DialogBody>{createCustomerFormContainer}</DialogBody>
        <DialogFooter>
          <CreateCustomerFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
