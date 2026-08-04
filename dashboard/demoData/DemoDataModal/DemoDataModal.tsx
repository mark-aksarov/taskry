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
import { useRouter } from "@/i18n/navigation";
import { DemoDataSummary } from "../DemoDataSummary";
import { useModal } from "@/common/ModalManagerContext";
import { seedDemoData } from "@/lib/actions/demoData/seedDemoData";
import { FormErrorBanner } from "@/dashboard/common/FormErrorBanner";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export function DemoDataModal() {
  const t = useTranslations("dashboard.demoData.DemoDataModal");

  const router = useRouter();
  const { state, action, isPending } = useActionStateWithCallbacks<undefined>(
    seedDemoData,
    {
      onSuccess: () => router.refresh(),
    },
  );

  useCloseModalOnActionSuccess(state, "demoData");
  useShowToastOnActionSuccess(state);
  useShowToastWhenModalClosedOnActionError(state, "demoData");

  const { isOpen, onOpenChange } = useModal("demoData");

  function handlePress() {
    startTransition(() => {
      action(undefined);
    });
  }

  return (
    <ConfirmModal
      data-test="demo-data-modal"
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
