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
import { ConfirmModal, ConfirmModalActions } from "@/common/ConfirmModal";
import { ImportModalUploadTrigger } from "@/dashboard/common/ImportModal";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { importProjectCategories } from "@/lib/actions/projectCategory/importProjectCategories";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export function ImportProjectCategoriesModal() {
  const t = useTranslations(
    "dashboard.projectCategories.ImportProjectCategoriesModal",
  );

  const router = useRouter();
  const { state, action, isPending } = useActionStateWithCallbacks(
    importProjectCategories,
    {
      onSuccess: () => router.refresh(),
    },
  );

  useCloseModalOnActionSuccess(state, "importProjectCategories");
  useShowToastOnActionSuccess(state);
  useShowToastWhenModalClosedOnActionError(state, "importProjectCategories");

  const [fileSizeError, setFileSizeError] = useState(false);
  const { isOpen, onOpenChange } = useModal("importProjectCategories");

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
