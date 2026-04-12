"use client";

import {
  UpdateCustomerEmailForm,
  UpdateCustomerEmailFormSubmitButton,
} from "../UpdateCustomerEmailForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
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
        <DialogBody>
          <UpdateCustomerEmailForm
            customerId={customerId}
            email={customerEmail}
          />
        </DialogBody>
        <DialogFooter>
          <UpdateCustomerEmailFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
