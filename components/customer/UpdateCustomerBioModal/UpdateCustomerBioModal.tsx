"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateCustomerBioForm } from "../UpdateCustomerBioForm";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateCustomerBioModalProps {
  customerId: number;
  customerBio?: string;
}

export function UpdateCustomerBioModal({
  customerId,
  customerBio,
}: UpdateCustomerBioModalProps) {
  const t = useTranslations("customers.UpdateCustomerBioModal");

  const { isOpen, onOpenChange } = useModal("updateCustomerBio");

  return (
    <FormBaseModal
      data-test="update-customer-bio-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[450px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateCustomerBioForm customerId={customerId} bio={customerBio} />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
