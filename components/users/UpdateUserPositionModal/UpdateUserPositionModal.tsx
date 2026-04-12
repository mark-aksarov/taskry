"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { UpdateUserPositionFormSubmitButton } from "../UpdateUserPositionForm";
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
      data-test="update-user-position-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>{updateUserPositionFormContainer}</DialogBody>
        <DialogFooter>
          <UpdateUserPositionFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
