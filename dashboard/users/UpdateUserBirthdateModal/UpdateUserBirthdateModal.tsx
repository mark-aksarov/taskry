"use client";

import {
  UpdateUserBirthdateForm,
  UpdateUserBirthdateFormSubmitButton,
} from "../UpdateUserBirthdateForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UpdateUserBirthdateModalProps {
  userId: string;
  userBirthdate?: string;
}

export function UpdateUserBirthdateModal({
  userId,
  userBirthdate,
}: UpdateUserBirthdateModalProps) {
  const t = useTranslations("dashboard.users.UpdateUserBirthdateModal");

  const { isOpen, onOpenChange } = useModal("updateUserBirthdate");

  return (
    <FormBaseModal
      data-test="update-user-birthdate-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <UpdateUserBirthdateForm userId={userId} birthdate={userBirthdate} />
        </DialogBody>
        <DialogFooter>
          <UpdateUserBirthdateFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
