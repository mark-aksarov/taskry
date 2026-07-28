"use client";

import {
  ImportModalCancelButton,
  ImportModalErrorBanner,
} from "@/dashboard/common/ImportModal";

import { useState } from "react";
import { DialogHeading } from "@/ui/Dialog";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useModal } from "@/common/ModalManagerContext";
import { ImportModalText } from "@/dashboard/common/ImportModal";
import { importClients } from "@/lib/actions/client/importClients";
import { ConfirmModal, ConfirmModalActions } from "@/common/ConfirmModal";
import { ImportModalUploadTrigger } from "@/dashboard/common/ImportModal";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export function ImportClientsModal() {
  const t = useTranslations("dashboard.clients.ImportClientsModal");

  const router = useRouter();
  const { action, state, isPending } = useActionStateWithCallbacks(
    importClients,
    {
      onSuccess: () => router.refresh(),
    },
  );

  useCloseModalOnActionSuccess(state, "importClients");
  useShowToastOnActionSuccess(state);
  useShowToastWhenModalClosedOnActionError(state, "importClients");

  const [fileSizeError, setFileSizeError] = useState(false);
  const { isOpen, onOpenChange } = useModal("importClients");

  return (
    <ConfirmModal
      data-test="import-clients-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ImportModalText />
      <ImportModalErrorBanner
        fileSizeError={fileSizeError}
        state={state}
        isPending={isPending}
      />

      <ConfirmModalActions>
        <ImportModalCancelButton />
        <ImportModalUploadTrigger
          action={action}
          isPending={isPending}
          setFileSizeError={setFileSizeError}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
