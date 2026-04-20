"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { UpdateUserBioFormSubmitButton } from "../UpdateUserBioForm";
import { UpdateUserBioForm } from "../UpdateUserBioForm/UpdateUserBioForm";
import { DialogHeaderWithClose } from "@/dashboard/common/DialogHeaderWithClose";

interface UpdateUserBioModalProps {
  userId: string;
  userBio?: string;
}

export function UpdateUserBioModal({
  userId,
  userBio,
}: UpdateUserBioModalProps) {
  const t = useTranslations("dashboard.users.UpdateUserBioModal");

  const { isOpen, onOpenChange } = useModal("updateUserBio");

  return (
    <FormBaseModal
      data-test="update-user-bio-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[450px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <DialogBody>
          <UpdateUserBioForm userId={userId} bio={userBio} />
        </DialogBody>
        <DialogFooter>
          <UpdateUserBioFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
