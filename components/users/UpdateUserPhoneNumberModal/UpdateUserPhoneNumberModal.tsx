"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { UpdateUserPhoneNumberForm } from "../UpdateUserPhoneNumberForm";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateUserPhoneNumberModalProps {
  userId: string;
  userPhoneNumber?: string;
}

export function UpdateUserPhoneNumberModal({
  userId,
  userPhoneNumber,
}: UpdateUserPhoneNumberModalProps) {
  const t = useTranslations("users.UpdateUserPhoneNumberModal");

  const { isOpen, onOpenChange } = useModal("updateUserPhoneNumber");

  return (
    <FormBaseModal
      data-test="update-user-phone-number-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateUserPhoneNumberForm
            userId={userId}
            phoneNumber={userPhoneNumber}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
