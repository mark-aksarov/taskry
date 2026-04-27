"use client";

import {
  CreatePositionForm,
  CreatePositionFormSubmitButton,
} from "../CreatePositionForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

export function CreatePositionModal() {
  const t = useTranslations("dashboard.positions.CreatePositionModal");

  const { isOpen, onOpenChange } = useModal("createPosition");

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <CreatePositionForm />
        </DialogBody>
        <DialogFooter>
          <CreatePositionFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
