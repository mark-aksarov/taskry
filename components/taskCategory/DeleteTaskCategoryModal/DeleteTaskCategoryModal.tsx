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

interface DeleteTaskCategoryModalProps extends ModalProps {
  taskCategoryId: number;
  taskCategoryName: string;
  deleteTaskCategories: ActionFn<ActionState, number[]>;
}

export function DeleteTaskCategoryModal({
  taskCategoryId,
  taskCategoryName,
  isOpen,
  onOpenChange,
  deleteTaskCategories,
}: DeleteTaskCategoryModalProps) {
  const t = useTranslations("taskCategories.DeleteTaskCategoryModal");

  const [_, action, isPending] = useDeleteModalActionState<number[]>({
    deleteEntity: deleteTaskCategories,
    onOpenChange,
  });

  const handleDelete = () => {
    startTransition(() => action([taskCategoryId]));
  };

  return (
    <ConfirmModal
      data-test="delete-task-category-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          name: taskCategoryName,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          isPending={isPending}
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-task-category-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
