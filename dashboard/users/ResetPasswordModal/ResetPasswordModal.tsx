"use client";

import {
  ResetPasswordForm,
  ResetPasswordFormSubmitButton,
} from "../ResetPasswordForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface ResetPasswordModalProps {
  userId: string;
}

export function ResetPasswordModal({ userId }: ResetPasswordModalProps) {
  const t = useTranslations("dashboard.users.ResetPasswordModal");

  const { isOpen, onOpenChange } = useModal("resetPassword");

  return (
    <FormBaseModal
      data-test="reset-password-modal"
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <ResetPasswordForm userId={userId} />
        </DialogBody>
        <DialogFooter>
          <ResetPasswordFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
