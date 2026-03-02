"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { NewCompanyForm } from "../NewCompanyForm";
import { DialogHeader } from "@/components/ui/Dialog";
import { useCreateCompany } from "../CreateCompanyContext";

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
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          <NewCompanyForm />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
