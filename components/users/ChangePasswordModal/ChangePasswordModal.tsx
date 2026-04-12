"use client";

import {
  ChangePasswordForm,
  ChangePasswordFormSubmitButton,
} from "../ChangePasswordForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface ChangePasswordModalProps {
  userId: string;
}

export function ChangePasswordModal({ userId }: ChangePasswordModalProps) {
  const t = useTranslations("users.ChangePasswordModal");

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
