"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
} from "@/common/ConfirmModal";

import { useTranslations } from "next-intl";
import { DialogHeading } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";

export function GuestModeModal() {
  const t = useTranslations("dashboard.common.GuestModeModal");

  const { isOpen, onOpenChange } = useModal("guestMode");

  return (
    <ConfirmModal
      data-test="guest-mode-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <span className="font-bold">{chunks}</span>,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
