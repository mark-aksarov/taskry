"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { CreatePositionForm } from "../CreatePositionForm";
import { useCreatePositionModal } from "./CreatePositionModalContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

export function CreatePositionModal() {
  const t = useTranslations("positions.CreatePositionModal");

  const { isOpen, onOpenChange } = useCreatePositionModal();

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <CreatePositionForm />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
