"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { UpdateUserPositionFormSubmitButton } from "../UpdateUserPositionForm";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateUserPositionModalProps {
  updateUserPositionFormContainer: React.ReactNode;
}

export function UpdateUserPositionModal({
  updateUserPositionFormContainer,
}: UpdateUserPositionModalProps) {
  const t = useTranslations("dashboard.users.UpdateUserPositionModal");

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
