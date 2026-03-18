"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { NewPositionForm } from "../NewPositionForm";
import { useCreatePosition } from "../CreatePositionContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

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
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <NewPositionForm />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
