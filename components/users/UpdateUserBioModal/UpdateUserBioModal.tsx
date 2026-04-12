"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { UpdateUserBioFormSubmitButton } from "../UpdateUserBioForm";
import { UpdateUserBioForm } from "../UpdateUserBioForm/UpdateUserBioForm";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateUserBioModalProps {
  userId: string;
  userBio?: string;
}

export function UpdateUserBioModal({
  userId,
  userBio,
}: UpdateUserBioModalProps) {
  const t = useTranslations("users.UpdateUserBioModal");

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
