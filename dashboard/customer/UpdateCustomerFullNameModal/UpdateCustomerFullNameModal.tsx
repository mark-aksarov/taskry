"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { UpdateCustomerFullNameForm } from "../UpdateCustomerFullNameForm";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";
import { UpdateCustomerFullNameFormSubmitButton } from "../UpdateCustomerFullNameForm";

interface UpdateCustomerFullNameModalProps {
  customerId: number;
  customerFullName?: string;
}

export function UpdateCustomerFullNameModal({
  customerId,
  customerFullName,
}: UpdateCustomerFullNameModalProps) {
  const t = useTranslations("dashboard.customers.UpdateCustomerFullNameModal");

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
        <DialogBody>
          <UpdateCustomerFullNameForm
            customerId={customerId}
            fullName={customerFullName}
          />
        </DialogBody>
        <DialogFooter>
          <UpdateCustomerFullNameFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
