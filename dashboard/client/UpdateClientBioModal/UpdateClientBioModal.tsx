"use client";

import {
  UpdateClientBioForm,
  UpdateClientBioFormSubmitButton,
} from "../UpdateClientBioForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateClientBioModalProps {
  clientId: number;
  clientBio?: string;
}

export function UpdateClientBioModal({
  clientId,
  clientBio,
}: UpdateClientBioModalProps) {
  const t = useTranslations("dashboard.clients.UpdateClientBioModal");

  const { isOpen, onOpenChange } = useModal("updateClientBio");

  return (
    <FormBaseModal
      data-test="update-client-bio-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[450px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <UpdateClientBioForm clientId={clientId} bio={clientBio} />
        </DialogBody>
        <DialogFooter>
          <UpdateClientBioFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
