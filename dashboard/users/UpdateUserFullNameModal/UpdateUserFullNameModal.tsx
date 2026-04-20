"use client";

import {
  UpdateUserFullNameForm,
  UpdateUserFullNameFormSubmitButton,
} from "../UpdateUserFullNameForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/dashboard/common/DialogHeaderWithClose";

interface UpdateUserFullNameModalProps {
  userId: string;
  userFullName?: string;
}

export function UpdateUserFullNameModal({
  userId,
  userFullName,
}: UpdateUserFullNameModalProps) {
  const t = useTranslations("dashboard.users.UpdateUserFullNameModal");

  const { isOpen, onOpenChange } = useModal("updateUserFullName");

  return (
    <FormBaseModal
      data-test="update-user-full-name-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <UpdateUserFullNameForm userId={userId} fullName={userFullName} />
        </DialogBody>
        <DialogFooter>
          <UpdateUserFullNameFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
