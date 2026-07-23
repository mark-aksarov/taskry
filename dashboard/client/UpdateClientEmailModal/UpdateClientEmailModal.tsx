"use client";

import {
  UpdateClientEmailForm,
  UpdateClientEmailFormSubmitButton,
} from "../UpdateClientEmailForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateClientEmailModalProps {
  clientId: number;
  clientEmail?: string;
}

export function UpdateClientEmailModal({
  clientId,
  clientEmail,
}: UpdateClientEmailModalProps) {
  const t = useTranslations("dashboard.clients.UpdateClientEmailModal");

  const { isOpen, onOpenChange } = useModal("updateClientEmail");

  return (
    <FormBaseModal
      data-test="update-client-email-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <UpdateClientEmailForm
            clientId={clientId}
            email={clientEmail}
          />
        </DialogBody>
        <DialogFooter>
          <UpdateClientEmailFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
