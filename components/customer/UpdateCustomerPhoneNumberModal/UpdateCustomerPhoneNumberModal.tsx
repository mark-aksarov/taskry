"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { UpdateCustomerPhoneNumberForm } from "../UpdateCustomerPhoneNumberForm";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateCustomerPhoneNumberModalProps {
  customerId: number;
  customerPhoneNumber?: string;
}

export function UpdateCustomerPhoneNumberModal({
  customerId,
  customerPhoneNumber,
}: UpdateCustomerPhoneNumberModalProps) {
  const t = useTranslations("customers.UpdateCustomerPhoneNumberModal");

  const { isOpen, onOpenChange } = useModal("updateCustomerPhoneNumber");

  return (
    <FormBaseModal
      data-test="update-customer-phone-number-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateCustomerPhoneNumberForm
            customerId={customerId}
            phoneNumber={customerPhoneNumber}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
