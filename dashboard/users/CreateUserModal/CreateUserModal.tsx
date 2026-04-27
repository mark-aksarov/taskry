"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { CreateUserForm, CreateUserFormSubmitButton } from "../CreateUserForm";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

export function CreateUserModal() {
  const t = useTranslations("dashboard.users.CreateUserModal");

  const { isOpen, onOpenChange } = useModal("createUser");

  return (
    <FormBaseModal
      data-test="create-user-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[450px]"
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
