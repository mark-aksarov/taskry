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
import { useDeleteTaskCategories } from "../DeleteTaskCategoriesContext";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { useDeleteEntityActionState } from "@/lib/hooks/useDeleteEntityActionState";

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

  const { startTransition, setTaskCategoryIds: setDeletedTaskCategoryIds } =
    useDeleteTaskCategories();

  const [, action] = useDeleteEntityActionState({
    deleteEntity: deleteTaskCategories,
    successMessage: t("successMessage"),
  });

  const { clear: clearSelectedItems } = useSelectedItems();

  function handleDelete() {
    onOpenChange?.(false);

    // Clear selected items
    clearSelectedItems();

    // Used to show an overlay on the selected task categories
    setDeletedTaskCategoryIds(taskCategoryIds);
    startTransition(() => action(taskCategoryIds));
  }

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
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-task-categories-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
