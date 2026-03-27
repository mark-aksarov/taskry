"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { CreateUserForm } from "../CreateUserForm";
import { useCreateUserModal } from "./CreateUserModalContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

export function CreateUserModal() {
  const t = useTranslations("users.CreateUserModal");

  const { isOpen, onOpenChange } = useCreateUserModal();

  return (
    <FormBaseModal
      data-test="create-user-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <CreateUserForm />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
