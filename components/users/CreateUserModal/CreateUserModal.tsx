"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { CreateUserForm, CreateUserFormSubmitButton } from "../CreateUserForm";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

export function CreateUserModal() {
  const t = useTranslations("users.CreateUserModal");

  const { isOpen, onOpenChange } = useModal("createUser");

  return (
    <FormBaseModal
      data-test="create-user-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <CreateUserForm />
        </DialogBody>
        <DialogFooter>
          <CreateUserFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
