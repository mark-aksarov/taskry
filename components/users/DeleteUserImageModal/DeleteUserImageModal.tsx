"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { DialogHeading } from "@/components/ui/Dialog";
import { useDeleteUserImage } from "../DeleteUserImageContext/DeleteUserImageContext";

interface DeleteUserImageModalProps {
  userId: string;
  userFullName: string;
}

export function DeleteUserImageModal({
  userId,
  userFullName,
}: DeleteUserImageModalProps) {
  const { action, isModalOpen, onModalOpenChange } = useDeleteUserImage();

  function handleDelete() {
    //close modal before deleting
    onModalOpenChange(false);

    startTransition(() => action(userId));
  }

  const t = useTranslations("users.DeleteUserImageModal");

  return (
    <ConfirmModal
      data-test="delete-user-image-modal"
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          name: userFullName,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          data-test="delete-user-image-modal-confirm-button"
          label={t("deleteButton")}
          onConfirm={handleDelete}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
