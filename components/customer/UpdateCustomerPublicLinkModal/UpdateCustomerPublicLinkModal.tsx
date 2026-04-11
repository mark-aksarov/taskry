"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateCustomerPublicLinkForm } from "../UpdateCustomerPublicLinkForm";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateCustomerPublicLinkModalProps {
  customerId: number;
  customerPublicLink?: string;
}

export function UpdateCustomerPublicLinkModal({
  customerId,
  customerPublicLink,
}: UpdateCustomerPublicLinkModalProps) {
  const t = useTranslations("customers.UpdateCustomerPublicLinkModal");

  const { isOpen, onOpenChange } = useModal("updateCustomerPublicLink");

  return (
    <FormBaseModal
      data-test="update-customer-public-link-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateCustomerPublicLinkForm
            customerId={customerId}
            publicLink={customerPublicLink}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
