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

export function ChangePasswordModal() {
  const t = useTranslations("dashboard.users.ChangePasswordModal");

  const { isOpen, onOpenChange } = useModal("changePassword");

  return (
    <FormBaseModal
      data-test="change-password-modal"
      className="md:w-[450px]"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <ChangePasswordForm />
        </DialogBody>
        <DialogFooter>
          <ChangePasswordFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
