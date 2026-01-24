import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
} from "./ConfirmModal";

import { useTranslations } from "next-intl";
import { DialogHeading } from "../ui/Dialog";

interface GuestModeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GuestModeModal({ isOpen, onOpenChange }: GuestModeModalProps) {
  const t = useTranslations("common.GuestModeModal");

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
