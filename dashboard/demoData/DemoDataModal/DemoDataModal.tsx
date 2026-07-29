"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/common/ConfirmModal";

import { startTransition } from "react";
import { DialogHeading } from "@/ui/Dialog";
import { useTranslations } from "next-intl";
import { useDemoData } from "../DemoDataContext";
import { useModal } from "@/common/ModalManagerContext";
import { DemoDataSummary } from "../DemoDataSummary";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";

export function DemoDataModal() {
  const t = useTranslations("dashboard.demoData.DemoDataModal");

  const { state, action, isPending } = useDemoData();
  const { isOpen, onOpenChange } = useModal("demoData");

  function handlePress() {
    startTransition(() => {
      action(undefined);
    });
  }

  return (
    <ConfirmModal
      data-test="quick-start-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>{t("text")}</ConfirmModalText>

      <DemoDataSummary />
      <FormErrorBanner
        className="mt-4"
        status={state.status}
        isPending={isPending}
      >
        {state.message}
      </FormErrorBanner>

      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButtonLabel")} />
        <ConfirmModalConfirmButton
          variant="accent"
          label={t("confirmButtonLabel")}
          isPending={isPending}
          onConfirm={handlePress}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
