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
import { useErrorToast } from "@/lib/hooks/useErrorToast";
import { ActionFn, ActionState } from "@/lib/actions/types";

const initialState: ActionState = {
  status: null,
};

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

  const { close: closeErrorToast, add: addErrorToast } = useErrorToast();

  const [_, action, isPending] = useActionState(
    async (prevState: ActionState, payload: number[]) => {
      const newState = await deleteProjectCategories(prevState, payload);

      closeErrorToast();

      if (newState.status === "success") {
        onOpenChange?.(false);
      } else if (newState.status === "error" && newState.message) {
        addErrorToast(newState.message);
      }

      return newState;
    },
    initialState,
  );

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
