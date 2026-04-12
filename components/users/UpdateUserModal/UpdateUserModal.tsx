"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateUserFormSubmitButton } from "../UpdateUserForm";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateUserModalProps {
  updateUserFormContainer: React.ReactNode;
}

export function UpdateUserModal({
  updateUserFormContainer,
}: UpdateUserModalProps) {
  const t = useTranslations("users.UpdateUserModal");

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
