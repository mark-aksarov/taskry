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

interface DeleteTaskCategoryModalProps extends ModalProps {
  taskCategoryId: number;
  taskCategoryName: string;
  deleteTaskCategories: ActionFn<ActionState, number[]>;
  onSuccess?: () => void;
}

export function DeleteTaskCategoryModal({
  taskCategoryId,
  taskCategoryName,
  isOpen,
  onOpenChange,
  deleteTaskCategories,
  onSuccess,
}: DeleteTaskCategoryModalProps) {
  const t = useTranslations("taskCategories.DeleteTaskCategoryModal");
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
