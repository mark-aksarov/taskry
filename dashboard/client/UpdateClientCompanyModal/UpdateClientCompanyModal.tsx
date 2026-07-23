"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";
import { UpdateClientCompanyFormSubmitButton } from "../UpdateClientCompanyForm";

interface UpdateClientCompanyModalProps {
  updateClientCompanyFormContainer: React.ReactNode;
}

export function UpdateClientCompanyModal({
  updateClientCompanyFormContainer,
}: UpdateClientCompanyModalProps) {
  const t = useTranslations("dashboard.clients.UpdateClientCompanyModal");

  const { isOpen, onOpenChange } = useModal("updateClientCompany");

  return (
    <FormBaseModal
      data-test="update-client-company-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>{updateClientCompanyFormContainer}</DialogBody>
        <DialogFooter>
          <UpdateClientCompanyFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
