"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { NewUserForm } from "../NewUserForm";
import { useCreateUser } from "../CreateUserContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

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
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <NewUserForm />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
