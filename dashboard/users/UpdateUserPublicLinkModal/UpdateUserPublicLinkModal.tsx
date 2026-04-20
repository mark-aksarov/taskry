"use client";

import {
  FormBaseModal,
  FormBaseModalDialog,
} from "@/dashboard/common/FormBaseModal";

import {
  UpdateUserPublicLinkForm,
  UpdateUserPublicLinkFormSubmitButton,
} from "../UpdateUserPublicLinkForm";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/dashboard/common/DialogHeaderWithClose";

interface UpdateUserPublicLinkModalProps {
  userId: string;
  userPublicLink?: string;
}

export function UpdateUserPublicLinkModal({
  userId,
  userPublicLink,
}: UpdateUserPublicLinkModalProps) {
  const t = useTranslations("dashboard.users.UpdateUserPublicLinkModal");

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
        <DialogBody>
          <UpdateUserPublicLinkForm
            userId={userId}
            publicLink={userPublicLink}
          />
        </DialogBody>
        <DialogFooter>
          <UpdateUserPublicLinkFormSubmitButton />
        </DialogFooter>
      </FormBaseModalDialog>
    </FormBaseModal>
  );
}
