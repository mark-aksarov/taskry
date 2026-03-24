"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { CreateCompanyForm } from "../CreateCompanyForm";
import { useCreateCompanyModal } from "./CreateCompanyModalContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

export function CreateCompanyModal() {
  const t = useTranslations("company.CreateCompanyModal");

  const { isOpen, onOpenChange } = useCreateCompanyModal();

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <CreateCompanyForm />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
