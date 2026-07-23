"use client";

import {
  ImportModalCancelButton,
  ImportModalErrorBanner,
} from "@/dashboard/common/ImportModal";

import { useState } from "react";
import { DialogHeading } from "@/ui/Dialog";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { useImportClients } from "../ImportClientsContext";
import { ImportModalText } from "@/dashboard/common/ImportModal";
import { ConfirmModal, ConfirmModalActions } from "@/common/ConfirmModal";
import { ImportModalUploadTrigger } from "@/dashboard/common/ImportModal";

export function ImportClientsModal() {
  const t = useTranslations("dashboard.clients.ImportClientsModal");

  const [fileSizeError, setFileSizeError] = useState(false);
  const { state, action, isPending } = useImportClients();
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
