"use client";

import {
  ImportModalCancelButton,
  ImportModalDocsLink,
  ImportModalDownloadLink,
  ImportModalErrorBanner,
} from "@/dashboard/common/ImportModal";

import { useState } from "react";
import { DialogHeading } from "@/ui/Dialog";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useModal } from "@/common/ModalManagerContext";
import { ImportModalText } from "@/dashboard/common/ImportModal";
import { importPositions } from "@/lib/actions/position/importPositions";
import { ConfirmModal, ConfirmModalActions } from "@/common/ConfirmModal";
import { ImportModalUploadTrigger } from "@/dashboard/common/ImportModal";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export function ImportPositionsModal() {
  const t = useTranslations("dashboard.clients.ImportPositionsModal");

  const router = useRouter();
  const { state, action, isPending } = useActionStateWithCallbacks(
    importPositions,
    {
      onSuccess: () => router.refresh(),
    },
  );

  useCloseModalOnActionSuccess(state, "importPositions");
  useShowToastOnActionSuccess(state);
  useShowToastWhenModalClosedOnActionError(state, "importPositions");

  const [fileSizeError, setFileSizeError] = useState(false);
  const { isOpen, onOpenChange } = useModal("importPositions");

  return (
    <ConfirmModal
      data-test="import-positions-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ImportModalText />
      <ImportModalDocsLink href="/docs/team/import-export" />
      <ImportModalDownloadLink />

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
