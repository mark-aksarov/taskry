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

interface DeleteCompanyModalProps extends ModalProps {
  companyId: number;
  companyName: string;
  deleteCompanies: ActionFn<ActionState, number[]>;
}

export function DeleteCompanyModal({
  companyId,
  companyName,
  isOpen,
  onOpenChange,
  deleteCompanies,
}: DeleteCompanyModalProps) {
  const t = useTranslations("company.DeleteCompanyModal");

  const [_, action, isPending] = useDeleteModalActionState<number[]>({
    deleteEntity: deleteCompanies,
    onOpenChange,
  });

  const handleDelete = () => {
    startTransition(() => action([companyId]));
  };

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
          isPending={isPending}
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-company-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
