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
import { startTransition, useActionState } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useErrorToast } from "@/lib/hooks/useErrorToast";

const initialState: ActionState = {
  status: null,
};

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

  // show error toast when delete action fails
  const { close: closeErrorToast, add: addErrorToast } = useErrorToast();

  const [_, action, isPending] = useActionState(
    async (prevState: ActionState, payload: number[]) => {
      // call server action to perform delete action
      const newState = await deleteTaskCategories(prevState, payload);

      // close error toast
      closeErrorToast();

      // close modal
      if (newState.status === "success") {
        onOpenChange?.(false);
      }
      // show error toast
      else if (newState.status === "error" && newState.message) {
        addErrorToast(newState.message);
      }

      return newState;
    },
    initialState,
  );

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
