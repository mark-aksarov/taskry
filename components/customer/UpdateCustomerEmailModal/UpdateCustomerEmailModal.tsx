"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateCustomerEmailForm } from "../UpdateCustomerEmailForm";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateCustomerEmailModalProps {
  customerId: number;
  customerEmail?: string;
}

export function UpdateCustomerEmailModal({
  customerId,
  customerEmail,
}: UpdateCustomerEmailModalProps) {
  const t = useTranslations("customers.UpdateCustomerEmailModal");

  const { isOpen, onOpenChange } = useModal("updateCustomerEmail");

  return (
    <FormBaseModal
      data-test="update-customer-email-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateCustomerEmailForm
            customerId={customerId}
            email={customerEmail}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
