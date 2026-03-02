"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { NewPositionForm } from "../NewPositionForm";
import { useCreatePosition } from "../CreatePositionContext";

export function NewPositionModal() {
  const t = useTranslations("positions.NewPositionModal");

  const { isModalOpen, onModalOpenChange } = useCreatePosition();

  return (
    <FormBaseModal
      className="md:w-[350px]"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          <NewPositionForm />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
