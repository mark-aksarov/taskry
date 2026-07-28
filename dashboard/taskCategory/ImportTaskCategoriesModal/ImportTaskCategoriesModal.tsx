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
import { importTaskCategories } from "@/lib/actions/taskCategory/importTaskCategories";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export function ImportTaskCategoriesModal() {
  const t = useTranslations(
    "dashboard.taskCategories.ImportTaskCategoriesModal",
  );

  const router = useRouter();
  const { state, action, isPending } = useActionStateWithCallbacks(
    importTaskCategories,
    {
      onSuccess: () => router.refresh(),
    },
  );

  useCloseModalOnActionSuccess(state, "importTaskCategories");
  useShowToastOnActionSuccess(state);
  useShowToastWhenModalClosedOnActionError(state, "importTaskCategories");

  const [fileSizeError, setFileSizeError] = useState(false);
  const { isOpen, onOpenChange } = useModal("importTaskCategories");

  return (
    <ConfirmModal
      data-test="import-task-categories-modal"
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
