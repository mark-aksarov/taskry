"use client";

import {
  UpdateUserBirthdateForm,
  UpdateUserBirthdateFormSubmitButton,
} from "../UpdateUserBirthdateForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateUserBirthdateModalProps {
  userId: string;
  userBirthdate?: string;
}

export function UpdateUserBirthdateModal({
  userId,
  userBirthdate,
}: UpdateUserBirthdateModalProps) {
  const t = useTranslations("users.UpdateUserBirthdateModal");

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
