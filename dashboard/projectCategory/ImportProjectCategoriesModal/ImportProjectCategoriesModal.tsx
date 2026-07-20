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
import { useImportProjectCategories } from "../ImportProjectCategoriesContext";

export function ImportProjectCategoriesModal() {
  const t = useTranslations(
    "dashboard.projectCategories.ImportProjectCategoriesModal",
  );

  const [fileSizeError, setFileSizeError] = useState(false);
  const { state, action, isPending } = useImportProjectCategories();
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
          setFileError={setFileSizeError}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
