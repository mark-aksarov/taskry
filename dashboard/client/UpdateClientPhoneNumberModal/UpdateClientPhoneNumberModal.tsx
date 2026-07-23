"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import {
  UpdateClientPhoneNumberForm,
  UpdateClientPhoneNumberFormSubmitButton,
} from "../UpdateClientPhoneNumberForm";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateClientPhoneNumberModalProps {
  clientId: number;
  clientPhoneNumber?: string;
}

export function UpdateClientPhoneNumberModal({
  clientId,
  clientPhoneNumber,
}: UpdateClientPhoneNumberModalProps) {
  const t = useTranslations(
    "dashboard.clients.UpdateClientPhoneNumberModal",
  );

  const { isOpen, onOpenChange } = useModal("updateClientPhoneNumber");

  return (
    <FormBaseModal
      data-test="update-client-phone-number-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <UpdateClientPhoneNumberForm
            clientId={clientId}
            phoneNumber={clientPhoneNumber}
          />
        </DialogBody>
        <DialogFooter>
          <UpdateClientPhoneNumberFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
