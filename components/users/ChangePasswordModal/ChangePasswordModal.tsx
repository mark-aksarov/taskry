"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogHeader } from "@/components/ui/Dialog";
import { ChangePasswordForm } from "../ChangePasswordForm";
import { useChangePassword } from "../ChangePasswordContext";

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
        <DialogHeader>{t("title")}</DialogHeader>
        <FormBaseModalDialogBody>
          <ChangePasswordForm userId={userId} />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
