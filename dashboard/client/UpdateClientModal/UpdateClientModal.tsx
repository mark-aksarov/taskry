"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { UpdateClientFormSubmitButton } from "../UpdateClientForm";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateClientModalProps {
  updateClientFormContainer: React.ReactNode;
}

export function UpdateClientModal({
  updateClientFormContainer,
}: UpdateClientModalProps) {
  const t = useTranslations("dashboard.clients.UpdateClientModal");

  const { isOpen, onOpenChange } = useModal("updateClient");

  return (
    <FormBaseModal
      data-test="update-client-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>{updateClientFormContainer}</DialogBody>
        <DialogFooter>
          <UpdateClientFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
