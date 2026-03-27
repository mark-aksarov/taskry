"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { useUpdateUserModal } from "./UpdateUserModalContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateUserModalProps {
  updateUserFormContainer: React.ReactNode;
}

export function UpdateUserModal({
  updateUserFormContainer,
}: UpdateUserModalProps) {
  const t = useTranslations("users.UpdateUserModal");

  const { isOpen, onOpenChange } = useUpdateUserModal();

  return (
    <FormBaseModal
      data-test="update-user-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          {updateUserFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
