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

interface DeleteTaskCategoriesModalProps extends ModalProps {
  taskCategoryIds: number[];
  deleteTaskCategories: ActionFn<ActionState, number[]>;
}

export function DeleteTaskCategoriesModal({
  taskCategoryIds,
  isOpen,
  onOpenChange,
  deleteTaskCategories,
}: DeleteTaskCategoriesModalProps) {
  const t = useTranslations("taskCategories.DeleteTaskCategoriesModal");

  const [_, action, isPending] = useDeleteModalActionState<number[]>({
    deleteEntity: deleteTaskCategories,
    onOpenChange,
  });

  const handleDelete = () => {
    startTransition(() => action(taskCategoryIds));
  };

  return (
    <ConfirmModal
      data-test="delete-task-categories-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          count: taskCategoryIds.length,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          isPending={isPending}
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-task-categories-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
