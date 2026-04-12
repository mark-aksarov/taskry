"use client";

import {
  CreateCompanyForm,
  CreateCompanyFormSubmitButton,
} from "../CreateCompanyForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

export function CreateCompanyModal() {
  const t = useTranslations("company.CreateCompanyModal");

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
