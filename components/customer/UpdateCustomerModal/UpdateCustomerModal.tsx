"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { UpdateCustomerFormSubmitButton } from "../UpdateCustomerForm";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateCustomerModalProps {
  updateCustomerFormContainer: React.ReactNode;
}

export function UpdateCustomerModal({
  updateCustomerFormContainer,
}: UpdateCustomerModalProps) {
  const t = useTranslations("customers.UpdateCustomerModal");

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
