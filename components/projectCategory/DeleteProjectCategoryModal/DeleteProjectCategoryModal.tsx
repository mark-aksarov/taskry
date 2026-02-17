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

interface DeleteProjectCategoryModalProps extends ModalProps {
  projectCategoryId: number;
  projectCategoryName: string;
  deleteProjectCategories: ActionFn<ActionState, number[]>;
}

export function DeleteProjectCategoryModal({
  projectCategoryId,
  projectCategoryName,
  isOpen,
  onOpenChange,
  deleteProjectCategories,
}: DeleteProjectCategoryModalProps) {
  const t = useTranslations("projectCategories.DeleteProjectCategoryModal");

  const [_, action, isPending] = useDeleteModalActionState<number[]>({
    deleteEntity: deleteProjectCategories,
    onOpenChange,
  });

  const handleDelete = () => {
    startTransition(() => action([projectCategoryId]));
  };

  return (
    <ConfirmModal
      data-test="delete-project-category-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          name: projectCategoryName,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          isPending={isPending}
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-project-category-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
