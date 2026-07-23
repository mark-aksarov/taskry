"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { UpdateClientFullNameForm } from "../UpdateClientFullNameForm";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";
import { UpdateClientFullNameFormSubmitButton } from "../UpdateClientFullNameForm";

interface UpdateClientFullNameModalProps {
  clientId: number;
  clientFullName?: string;
}

export function UpdateClientFullNameModal({
  clientId,
  clientFullName,
}: UpdateClientFullNameModalProps) {
  const t = useTranslations("dashboard.clients.UpdateClientFullNameModal");

  const { isOpen, onOpenChange } = useModal("updateClientFullName");

  return (
    <FormBaseModal
      data-test="update-client-full-name-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <UpdateClientFullNameForm
            clientId={clientId}
            fullName={clientFullName}
          />
        </DialogBody>
        <DialogFooter>
          <UpdateClientFullNameFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
