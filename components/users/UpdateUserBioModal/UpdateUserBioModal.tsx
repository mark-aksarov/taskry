"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateUserBioForm } from "../UpdateUserBioForm";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateUserBioModalProps {
  userId: string;
  userBio?: string;
}

export function UpdateUserBioModal({
  userId,
  userBio,
}: UpdateUserBioModalProps) {
  const t = useTranslations("users.UpdateUserBioModal");

  const { isOpen, onOpenChange } = useModal("updateUserBio");

  return (
    <FormBaseModal
      data-test="update-user-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateUserBioForm userId={userId} bio={userBio} />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
