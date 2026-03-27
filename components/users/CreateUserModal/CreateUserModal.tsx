"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { CreateUserForm } from "../CreateUserForm";
import { useCreateUser } from "../CreateUserContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

export function CreateUserModal() {
  const t = useTranslations("users.CreateUserModal");

  const { isModalOpen, onModalOpenChange } = useCreateUser();

  return (
    <FormBaseModal
      data-test="create-user-modal"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
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
