"use client";

import {
  CreateCompanyForm,
  CreateCompanyFormSubmitButton,
} from "../CreateCompanyForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/dashboard/common/DialogHeaderWithClose";

export function CreateCompanyModal() {
  const t = useTranslations("dashboard.company.CreateCompanyModal");

  const { isOpen, onOpenChange } = useModal("createCompany");

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <CreateCompanyForm />
        </DialogBody>
        <DialogFooter>
          <CreateCompanyFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
