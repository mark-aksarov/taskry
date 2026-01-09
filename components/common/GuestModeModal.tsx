import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
} from "./ConfirmModal";

import { DialogHeading } from "../ui";
import { useTranslations } from "next-intl";

interface GuestModeModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GuestModeModal({ isOpen, onOpenChange }: GuestModeModalProps) {
  const t = useTranslations("common.GuestModeModal");

  return (
    <ConfirmModal isOpen={isOpen} onOpenChange={onOpenChange}>
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
