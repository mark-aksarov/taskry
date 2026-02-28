"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeading } from "@/components/ui/Dialog";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useDeleteCompanies } from "../DeleteCompaniesContext";
import { useDeleteEntityActionState } from "@/lib/hooks/useDeleteEntityActionState";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface DeleteCompaniesModalProps extends ModalProps {
  companyIds: number[];
  deleteCompanies: ActionFn<ActionState, number[]>;
}

export function DeleteCompaniesModal({
  companyIds,
  isOpen,
  deleteCompanies,
  onOpenChange,
}: DeleteCompaniesModalProps) {
  const t = useTranslations("company.DeleteCompaniesModal");

  const { startTransition, setCompanyIds: setDeleteCompanyIds } =
    useDeleteCompanies();

  const [, action] = useDeleteEntityActionState({
    deleteEntity: deleteCompanies,
    successMessage: t("successMessage"),
  });

  const { clear: clearSelectedItems } = useSelectedItems();

  function handleDelete() {
    onOpenChange?.(false);

    // Clear selected items
    clearSelectedItems();

    // Used to show an overlay on the selected companies
    setDeleteCompanyIds(companyIds);
    startTransition(() => action(companyIds));
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
          count: companyIds.length,
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
