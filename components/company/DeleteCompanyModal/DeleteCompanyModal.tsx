"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import { useTranslations } from "next-intl";
import { DialogHeading } from "@/components/ui/Dialog";
import { useDeleteCompany } from "../DeleteCompanyContext";
import { handleDeleteEntity } from "@/lib/utils/handleDeleteEntity";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface DeleteCompanyModalProps {
  companyId: number;
  companyName: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteCompanyModal({
  companyId,
  companyName,
  isOpen,
  onOpenChange,
}: DeleteCompanyModalProps) {
  const t = useTranslations("company.DeleteCompanyModal");

  const { action } = useDeleteCompany();

  const { remove: removeSelected } = useSelectedItems();

  function handleDelete() {
    handleDeleteEntity(
      removeSelected,
      action,
      [companyId],
      companyId,
      onOpenChange,
    );
  }

  return (
    <ConfirmModal
      data-test="delete-company-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          name: companyName,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-company-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
