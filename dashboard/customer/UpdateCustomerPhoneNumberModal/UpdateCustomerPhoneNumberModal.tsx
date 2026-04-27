"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import {
  UpdateCustomerPhoneNumberForm,
  UpdateCustomerPhoneNumberFormSubmitButton,
} from "../UpdateCustomerPhoneNumberForm";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateCustomerPhoneNumberModalProps {
  customerId: number;
  customerPhoneNumber?: string;
}

export function UpdateCustomerPhoneNumberModal({
  customerId,
  customerPhoneNumber,
}: UpdateCustomerPhoneNumberModalProps) {
  const t = useTranslations(
    "dashboard.customers.UpdateCustomerPhoneNumberModal",
  );

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
        <DialogBody>
          <UpdateCustomerPhoneNumberForm
            customerId={customerId}
            phoneNumber={customerPhoneNumber}
          />
        </DialogBody>
        <DialogFooter>
          <UpdateCustomerPhoneNumberFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
