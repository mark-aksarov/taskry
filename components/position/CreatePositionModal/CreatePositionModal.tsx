"use client";

import {
  CreatePositionForm,
  CreatePositionFormSubmitButton,
} from "../CreatePositionForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

export function CreatePositionModal() {
  const t = useTranslations("positions.CreatePositionModal");

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
