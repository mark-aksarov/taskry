"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ChangePasswordForm } from "../ChangePasswordForm";
import { useChangePassword } from "../ChangePasswordContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface ChangePasswordModalProps {
  userId: string;
}

export function ChangePasswordModal({ userId }: ChangePasswordModalProps) {
  const t = useTranslations("users.ChangePasswordModal");

  const { isModalOpen, onModalOpenChange } = useChangePassword();

  return (
    <FormBaseModal
      data-test="change-password-modal"
      className="md:w-[350px]"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <ChangePasswordForm userId={userId} />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
