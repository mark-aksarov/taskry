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
import { useDeleteEntityActionState } from "@/lib/hooks/useDeleteEntityActionState";
import { useDeleteTaskCategoryTransition } from "../DeleteTaskCategoryTransitionContext";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";

interface DeleteTaskCategoryModalProps extends ModalProps {
  taskCategoryId: number;
  taskCategoryName: string;
  deleteTaskCategory: ActionFn<ActionState, number[]>;
}

export function DeleteTaskCategoryModal({
  taskCategoryId,
  taskCategoryName,
  deleteTaskCategory,
  isOpen,
  onOpenChange,
}: DeleteTaskCategoryModalProps) {
  const t = useTranslations("taskCategories.DeleteTaskCategoryModal");

  const { startTransition } = useDeleteTaskCategoryTransition();

  const [, action] = useDeleteEntityActionState({
    deleteEntity: deleteTaskCategory,
    successMessage: t("successMessage"),
  });

  const { remove: removeSelected } = useSelectedItems();

  function handleDelete() {
    //Remove the company from the selection to prevent access to it
    removeSelected(taskCategoryId);

    //close modal before deleting
    onOpenChange?.(false);
    startTransition(() => action([taskCategoryId]));
  }

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
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-task-category-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
