"use client";

import {
  UpdateCompanyForm,
  UpdateCompanyFormSubmitButton,
} from "../UpdateCompanyForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

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
