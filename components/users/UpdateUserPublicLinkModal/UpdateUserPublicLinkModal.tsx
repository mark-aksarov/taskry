"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
  FormBaseModalDialogBody,
} from "@/components/common/FormBaseModal";

import { useTranslations } from "next-intl";
import { UpdateUserPublicLinkForm } from "../UpdateUserPublicLinkForm";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UpdateUserPublicLinkModalProps {
  userId: string;
  userPublicLink?: string;
}

export function UpdateUserPublicLinkModal({
  userId,
  userPublicLink,
}: UpdateUserPublicLinkModalProps) {
  const t = useTranslations("users.UpdateUserPublicLinkModal");

  const { isOpen, onOpenChange } = useModal("updateUserPublicLink");

  return (
    <FormBaseModal
      data-test="update-user-public-link-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="md:w-[350px]"
    >
      <FormBaseModalDialog>
        <DialogHeaderWithClose>{t("title")}</DialogHeaderWithClose>
        <FormBaseModalDialogBody>
          <UpdateUserPublicLinkForm
            userId={userId}
            publicLink={userPublicLink}
          />
        </FormBaseModalDialogBody>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
