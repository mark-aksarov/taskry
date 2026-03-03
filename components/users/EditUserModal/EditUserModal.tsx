"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { useUpdateUser } from "../UpdateUserContext";

interface EditUserModalProps {
  editUserFormContainer: React.ReactNode;
}

export function EditUserModal({ editUserFormContainer }: EditUserModalProps) {
  const t = useTranslations("users.EditUserModal");

  const { isModalOpen, onModalOpenChange } = useUpdateUser();

  return (
    <FormBaseModal
      data-test="edit-user-modal"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          {editUserFormContainer}
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
