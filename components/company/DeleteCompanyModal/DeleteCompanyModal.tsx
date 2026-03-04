"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { DialogHeading } from "@/components/ui/Dialog";
import { useDeleteCompany } from "../DeleteCompanyContext";
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
    //Remove the entity from the selection to prevent access to it
    removeSelected(companyId);

    //close modal before deleting
    onOpenChange(false);

    startTransition(() => action(companyId));
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
