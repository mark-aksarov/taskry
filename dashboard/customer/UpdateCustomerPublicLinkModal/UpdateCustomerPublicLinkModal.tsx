"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import {
  UpdateCustomerPublicLinkForm,
  UpdateCustomerPublicLinkFormSubmitButton,
} from "../UpdateCustomerPublicLinkForm";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/dashboard/common/DialogHeaderWithClose";

interface UpdateCustomerPublicLinkModalProps {
  customerId: number;
  customerPublicLink?: string;
}

export function UpdateCustomerPublicLinkModal({
  customerId,
  customerPublicLink,
}: UpdateCustomerPublicLinkModalProps) {
  const t = useTranslations(
    "dashboard.customers.UpdateCustomerPublicLinkModal",
  );

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
        <DialogBody>
          <UpdateCustomerPublicLinkForm
            customerId={customerId}
            publicLink={customerPublicLink}
          />
        </DialogBody>
        <DialogFooter>
          <UpdateCustomerPublicLinkFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
