"use client";

import {
  UpdateCustomerEmailForm,
  UpdateCustomerEmailFormSubmitButton,
} from "../UpdateCustomerEmailForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateCustomerEmailModalProps {
  customerId: number;
  customerEmail?: string;
}

export function UpdateCustomerEmailModal({
  customerId,
  customerEmail,
}: UpdateCustomerEmailModalProps) {
  const t = useTranslations("dashboard.customers.UpdateCustomerEmailModal");

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
