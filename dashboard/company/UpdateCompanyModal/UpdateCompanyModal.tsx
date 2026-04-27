"use client";

import {
  UpdateCompanyForm,
  UpdateCompanyFormSubmitButton,
} from "../UpdateCompanyForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateCompanyModalProps {
  companyId: number;
  companyName: string;
}

export function UpdateCompanyModal({
  companyId,
  companyName,
}: UpdateCompanyModalProps) {
  const t = useTranslations("dashboard.company.UpdateCompanyModal");

  const { isOpen, onOpenChange } = useModal("updateCompany");

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <UpdateCompanyForm
            companyId={companyId}
            nameDefaultValue={companyName}
          />
        </DialogBody>
        <DialogFooter>
          <UpdateCompanyFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
