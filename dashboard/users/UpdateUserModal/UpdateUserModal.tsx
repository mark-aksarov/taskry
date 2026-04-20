"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateUserFormSubmitButton } from "../UpdateUserForm";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/dashboard/common/DialogHeaderWithClose";

interface UpdateUserModalProps {
  updateUserFormContainer: React.ReactNode;
}

export function UpdateUserModal({
  updateUserFormContainer,
}: UpdateUserModalProps) {
  const t = useTranslations("dashboard.users.UpdateUserModal");

  const { isOpen, onOpenChange } = useModal("updateUser");

  return (
    <FormBaseModal
      data-test="update-user-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>{updateUserFormContainer}</DialogBody>
        <DialogFooter>
          <UpdateUserFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
