"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateUserBirthdateForm } from "../UpdateUserBirthdateForm";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateUserBirthdateModalProps {
  userId: string;
  userBirthdate?: string;
}

export function UpdateUserBirthdateModal({
  userId,
  userBirthdate,
}: UpdateUserBirthdateModalProps) {
  const t = useTranslations("users.UpdateUserBirthdateModal");

  const { isOpen, onOpenChange } = useModal("updateUserBirthdate");

  return (
    <FormBaseModal
      data-test="update-user-birthdate-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateUserBirthdateForm userId={userId} birthdate={userBirthdate} />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
