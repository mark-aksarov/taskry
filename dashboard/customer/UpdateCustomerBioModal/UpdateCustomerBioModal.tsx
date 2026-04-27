"use client";

import {
  UpdateCustomerBioForm,
  UpdateCustomerBioFormSubmitButton,
} from "../UpdateCustomerBioForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateCustomerBioModalProps {
  customerId: number;
  customerBio?: string;
}

export function UpdateCustomerBioModal({
  customerId,
  customerBio,
}: UpdateCustomerBioModalProps) {
  const t = useTranslations("dashboard.customers.UpdateCustomerBioModal");

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
        <DialogBody>
          <UpdateCustomerBioForm customerId={customerId} bio={customerBio} />
        </DialogBody>
        <DialogFooter>
          <UpdateCustomerBioFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
