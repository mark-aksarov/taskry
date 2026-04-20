"use client";

import {
  UpdateUserPhoneNumberForm,
  UpdateUserPhoneNumberFormSubmitButton,
} from "../UpdateUserPhoneNumberForm";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/dashboard/common/DialogHeaderWithClose";

interface UpdateUserPhoneNumberModalProps {
  userId: string;
  userPhoneNumber?: string;
}

export function UpdateUserPhoneNumberModal({
  userId,
  userPhoneNumber,
}: UpdateUserPhoneNumberModalProps) {
  const t = useTranslations("dashboard.users.UpdateUserPhoneNumberModal");

  const { isOpen, onOpenChange } = useModal("updateUserPhoneNumber");

  return (
    <FormBaseModal
      data-test="update-user-phone-number-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <UpdateUserPhoneNumberForm
            userId={userId}
            phoneNumber={userPhoneNumber}
          />
        </DialogBody>
        <DialogFooter>
          <UpdateUserPhoneNumberFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
