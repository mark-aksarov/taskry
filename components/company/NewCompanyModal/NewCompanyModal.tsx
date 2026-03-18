"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { NewCompanyForm } from "../NewCompanyForm";
import { useCreateCompany } from "../CreateCompanyContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

export function NewCompanyModal() {
  const t = useTranslations("company.NewCompanyModal");

  const { isModalOpen, onModalOpenChange } = useCreateCompany();

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <NewCompanyForm />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
