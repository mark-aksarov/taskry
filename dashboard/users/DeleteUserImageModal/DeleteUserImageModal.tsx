"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/dashboard/common/ConfirmModal";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { DialogHeading } from "@/ui/Dialog";
import { useClearUserImageUrl } from "../ClearUserImageUrlContext";
import { useModal } from "@/dashboard/common/ModalManagerContext";

interface DeleteUserImageModalProps {
  userId: string;
  userFullName: string;
}

export function DeleteUserImageModal({
  userId,
  userFullName,
}: DeleteUserImageModalProps) {
  const { action } = useClearUserImageUrl();
  const { isOpen, onOpenChange } = useModal("deleteUserImage");

  function handleDelete() {
    //close modal before deleting
    onOpenChange(false);

    startTransition(() => action(userId));
  }

  const t = useTranslations("dashboard.users.DeleteUserImageModal");

  return (
    <ConfirmModal
      data-test="delete-user-image-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
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
