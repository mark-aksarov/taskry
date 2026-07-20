"use client";

import {
  ImportModalCancelButton,
  ImportModalErrorBanner,
} from "@/dashboard/common/ImportModal";

import { useState } from "react";
import { DialogHeading } from "@/ui/Dialog";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { ImportModalText } from "@/dashboard/common/ImportModal";
import { ConfirmModal, ConfirmModalActions } from "@/common/ConfirmModal";
import { ImportModalUploadTrigger } from "@/dashboard/common/ImportModal";
import { useImportTaskCategories } from "../ImportTaskCategoriesContext";

export function ImportTaskCategoriesModal() {
  const t = useTranslations(
    "dashboard.taskCategories.ImportTaskCategoriesModal",
  );

  const [fileSizeError, setFileSizeError] = useState(false);
  const { state, action, isPending } = useImportTaskCategories();
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
          setFileError={setFileSizeError}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
