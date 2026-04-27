"use client";

import {
  ChangePasswordForm,
  ChangePasswordFormSubmitButton,
} from "../ChangePasswordForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface ChangePasswordModalProps {
  userId: string;
}

export function ChangePasswordModal({ userId }: ChangePasswordModalProps) {
  const t = useTranslations("dashboard.users.ChangePasswordModal");

  const { isOpen, onOpenChange } = useModal("changePassword");

  return (
    <FormBaseModal
      data-test="change-password-modal"
      className="md:w-[350px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <ChangePasswordForm userId={userId} />
        </DialogBody>
        <DialogFooter>
          <ChangePasswordFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
