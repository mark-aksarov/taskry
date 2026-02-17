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
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeading } from "@/components/ui/Dialog";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useDeleteModalActionState } from "@/components/common/BaseDeleteModal";

interface DeleteCompaniesModalProps extends ModalProps {
  companyIds: number[];
  deleteCompanies: ActionFn<ActionState, number[]>;
}

export function DeleteCompaniesModal({
  companyIds,
  isOpen,
  onOpenChange,
  deleteCompanies,
}: DeleteCompaniesModalProps) {
  const t = useTranslations("company.DeleteCompaniesModal");

  const [_, action, isPending] = useDeleteModalActionState<number[]>({
    deleteEntity: deleteCompanies,
    onOpenChange,
  });

  const handleDelete = () => {
    startTransition(() => action(companyIds));
  };

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
          isPending={isPending}
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-companies-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
