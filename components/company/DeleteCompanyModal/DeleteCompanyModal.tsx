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
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { useDeleteCompanyTransition } from "../DeleteCompanyTransitionContext";
import { useDeleteEntityActionState } from "@/lib/hooks/useDeleteEntityActionState";

interface DeleteCompanyModalProps extends ModalProps {
  companyId: number;
  companyName: string;
  deleteCompany: ActionFn<ActionState, number[]>;
}

export function DeleteCompanyModal({
  companyId,
  companyName,
  deleteCompany,
  isOpen,
  onOpenChange,
}: DeleteCompanyModalProps) {
  const t = useTranslations("company.DeleteCompanyModal");

  const { startTransition } = useDeleteCompanyTransition();

  const [, action] = useDeleteEntityActionState({
    deleteEntity: deleteCompany,
    successMessage: t("successMessage"),
  });

  const { remove: removeSelected } = useSelectedItems();

  function handleDelete() {
    //Remove the company from the selection to prevent access to it
    removeSelected(companyId);

    //close modal before deleting
    onOpenChange?.(false);
    startTransition(() => action([companyId]));
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
