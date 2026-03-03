"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { NewUserForm } from "../NewUserForm";
import { DialogHeader } from "@/components/ui/Dialog";
import { useCreateUser } from "../CreateUserContext";

export function NewUserModal() {
  const t = useTranslations("users.NewUserModal");

  const { isModalOpen, onModalOpenChange } = useCreateUser();

  return (
    <FormBaseModal
      data-test="new-user-modal"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          <NewUserForm />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
