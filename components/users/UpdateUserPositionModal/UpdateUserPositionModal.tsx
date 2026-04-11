"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateUserPositionModalProps {
  updateUserPositionFormContainer: React.ReactNode;
}

export function UpdateUserPositionModal({
  updateUserPositionFormContainer,
}: UpdateUserPositionModalProps) {
  const t = useTranslations("users.UpdateUserPositionModal");

  const { isOpen, onOpenChange } = useModal("updateUserPosition");

  return (
    <FormBaseModal
      data-test="update-user-bio-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {updateUserPositionFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
