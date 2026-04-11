"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateUserFullNameForm } from "../UpdateUserFullNameForm";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateUserFullNameModalProps {
  userId: string;
  userFullName?: string;
}

export function UpdateUserFullNameModal({
  userId,
  userFullName,
}: UpdateUserFullNameModalProps) {
  const t = useTranslations("users.UpdateUserFullNameModal");

  const { isOpen, onOpenChange } = useModal("updateUserFullName");

  return (
    <FormBaseModal
      data-test="update-user-full-name-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateUserFullNameForm userId={userId} fullName={userFullName} />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
