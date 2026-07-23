"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import {
  UpdateClientPublicLinkForm,
  UpdateClientPublicLinkFormSubmitButton,
} from "../UpdateClientPublicLinkForm";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateClientPublicLinkModalProps {
  clientId: number;
  clientPublicLink?: string;
}

export function UpdateClientPublicLinkModal({
  clientId,
  clientPublicLink,
}: UpdateClientPublicLinkModalProps) {
  const t = useTranslations(
    "dashboard.clients.UpdateClientPublicLinkModal",
  );

  const { isOpen, onOpenChange } = useModal("updateClientPublicLink");

  return (
    <FormBaseModal
      data-test="update-client-public-link-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <UpdateClientPublicLinkForm
            clientId={clientId}
            publicLink={clientPublicLink}
          />
        </DialogBody>
        <DialogFooter>
          <UpdateClientPublicLinkFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
