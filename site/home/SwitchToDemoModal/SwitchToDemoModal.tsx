"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/common/ConfirmModal";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { DialogHeading } from "@/ui/Dialog";
import { useRouter } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { useModal } from "@/common/ModalManagerContext";
import { useAddErrorToast } from "@/lib/hooks/useAddErrorToast";

interface SwitchToDemoModalProps {
  signOut: () => Promise<ActionState>;
}

export function SwitchToDemoModal({ signOut }: SwitchToDemoModalProps) {
  const t = useTranslations("site.home.SwitchToDemoModal");
  const [isPending, startTransition] = useTransition();
  const addErrorToast = useAddErrorToast();
  const router = useRouter();

  const { isOpen, onOpenChange } = useModal("switch-to-demo-modal");

  function handleConfirm() {
    startTransition(async () => {
      const result = await signOut();

      if (result.status === "error") {
        addErrorToast(result.message!);
        return;
      }

      router.push("/guest-sign-in");
    });
  }

  return (
    <ConfirmModal
      data-test="switch-to-demo-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>{t("text")}</ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          isPending={isPending}
          label={t("confirmButton")}
          onConfirm={handleConfirm}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
