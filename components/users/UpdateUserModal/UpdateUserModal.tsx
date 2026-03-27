"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useUpdateUser } from "../UpdateUserContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateUserModalProps {
  editUserFormContainer: React.ReactNode;
}

export function UpdateUserModal({
  editUserFormContainer,
}: UpdateUserModalProps) {
  const t = useTranslations("users.UpdateUserModal");

  const { isModalOpen, onModalOpenChange } = useUpdateUser();

  return (
    <FormBaseModal
      data-test="edit-user-modal"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {editUserFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
