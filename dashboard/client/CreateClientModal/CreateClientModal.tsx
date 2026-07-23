"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { CreateClientFormSubmitButton } from "../CreateClientForm";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface NewClientModalProps {
  createClientFormContainer: React.ReactNode;
}

export function CreateClientModal({
  createClientFormContainer,
}: NewClientModalProps) {
  const t = useTranslations("dashboard.clients.CreateClientModal");

  const { isOpen, onOpenChange } = useModal("createClient");

  return (
    <FormBaseModal
      data-test="create-client-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>{createClientFormContainer}</DialogBody>
        <DialogFooter>
          <CreateClientFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
