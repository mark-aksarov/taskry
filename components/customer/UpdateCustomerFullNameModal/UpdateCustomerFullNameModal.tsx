"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { UpdateCustomerFullNameForm } from "../UpdateCustomerFullNameForm";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateCustomerFullNameModalProps {
  customerId: number;
  customerFullName?: string;
}

export function UpdateCustomerFullNameModal({
  customerId,
  customerFullName,
}: UpdateCustomerFullNameModalProps) {
  const t = useTranslations("customers.UpdateCustomerFullNameModal");

  const { isOpen, onOpenChange } = useModal("updateCustomerFullName");

  return (
    <FormBaseModal
      data-test="update-customer-full-name-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateCustomerFullNameForm
            customerId={customerId}
            fullName={customerFullName}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
