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
import { startTransition, useActionState, useEffect } from "react";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";

const initialState: ActionState = {
  status: null,
};

interface DeleteTaskCategoriesModalProps extends ModalProps {
  taskCategoryIds: number[];
  deleteTaskCategories: ActionFn<ActionState, number[]>;
  onSuccess?: () => void;
}

export function DeleteTaskCategoriesModal({
  taskCategoryIds,
  isOpen,
  onOpenChange,
  deleteTaskCategories,
  onSuccess,
}: DeleteTaskCategoriesModalProps) {
  const t = useTranslations("taskCategories.DeleteTaskCategoriesModal");
  const [state, action, isPending] = useActionState(
    deleteTaskCategories,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      onSuccess?.();
      onOpenChange?.(false);
    }
  }, [state.status, onSuccess]);

  useActionErrorToast(state, t("deleteError"));

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
