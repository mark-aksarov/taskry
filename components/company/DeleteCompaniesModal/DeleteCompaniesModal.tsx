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
import { useDeleteCompanies } from "../DeleteCompaniesContext";
import { handleDeleteEntities } from "@/lib/utils/handleDeleteEntities";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface DeleteCompaniesModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteCompaniesModal({
  isOpen,
  onOpenChange,
}: DeleteCompaniesModalProps) {
  const t = useTranslations("company.DeleteCompaniesModal");

  const selected = useSelectedItems();
  const { action, setIds: setDeleteCompanyIds } = useDeleteCompanies();
  const { clear: clearSelectedItems } = useSelectedItems();

  function handleDelete() {
    handleDeleteEntities(
      selected.ids,
      action,
      selected.ids,
      setDeleteCompanyIds,
      clearSelectedItems,
      onOpenChange,
    );
  }

  return (
    <ConfirmModal
      data-test="delete-companies-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          count: selected.ids.length,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-companies-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
