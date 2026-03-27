"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { ChangePasswordForm } from "../ChangePasswordForm";
import { useChangePasswordModal } from "./ChangePasswordModalContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface ChangePasswordModalProps {
  userId: string;
}

export function ChangePasswordModal({ userId }: ChangePasswordModalProps) {
  const t = useTranslations("users.ChangePasswordModal");

  const { isOpen, onOpenChange } = useChangePasswordModal();

  return (
    <FormBaseModal
      data-test="change-password-modal"
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
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
