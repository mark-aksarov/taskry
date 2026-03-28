"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateCompanyForm } from "../UpdateCompanyForm";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";
import { useModal } from "@/components/common/ModalManagerContext";

interface UpdateCompanyModalProps {
  companyId: number;
  companyName: string;
}

export function UpdateCompanyModal({
  companyId,
  companyName,
}: UpdateCompanyModalProps) {
  const t = useTranslations("company.UpdateCompanyModal");

  const { isOpen, onOpenChange } = useModal("updateCompany");

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateCompanyForm
            companyId={companyId}
            nameDefaultValue={companyName}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
