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
import { importCompanies } from "@/lib/actions/company/importCompanies";
import { ConfirmModal, ConfirmModalActions } from "@/common/ConfirmModal";
import { ImportModalUploadTrigger } from "@/dashboard/common/ImportModal";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export function ImportCompaniesModal() {
  const t = useTranslations("dashboard.companies.ImportCompaniesModal");

  const router = useRouter();
  const { state, action, isPending } = useActionStateWithCallbacks(
    importCompanies,
    {
      onSuccess: () => router.refresh(),
    },
  );

  useCloseModalOnActionSuccess(state, "importCompanies");
  useShowToastOnActionSuccess(state);
  useShowToastWhenModalClosedOnActionError(state, "importCompanies");

  const [fileSizeError, setFileSizeError] = useState(false);
  const { isOpen, onOpenChange } = useModal("importCompanies");

  return (
    <ConfirmModal
      data-test="import-project-categories-modal"
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
