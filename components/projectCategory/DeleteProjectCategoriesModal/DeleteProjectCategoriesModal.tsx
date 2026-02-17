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

interface DeleteProjectCategoriesModalProps extends ModalProps {
  projectCategoryIds: number[];
  deleteProjectCategories: ActionFn<ActionState, number[]>;
}

export function DeleteProjectCategoriesModal({
  projectCategoryIds,
  isOpen,
  onOpenChange,
  deleteProjectCategories,
}: DeleteProjectCategoriesModalProps) {
  const t = useTranslations("projectCategories.DeleteProjectCategoriesModal");

  const [_, action, isPending] = useDeleteModalActionState<number[]>({
    deleteEntity: deleteProjectCategories,
    onOpenChange,
  });

  const handleDelete = () => {
    startTransition(() => action(projectCategoryIds));
  };

  return (
    <ConfirmModal
      data-test="delete-project-categories-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          count: projectCategoryIds.length,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          isPending={isPending}
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-project-categories-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
