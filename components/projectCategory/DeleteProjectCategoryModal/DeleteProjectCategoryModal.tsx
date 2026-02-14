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

interface DeleteProjectCategoryModalProps extends ModalProps {
  projectCategoryId: number;
  projectCategoryName: string;
  deleteProjectCategories: ActionFn<ActionState, number[]>;
  onSuccess?: () => void;
}

export function DeleteProjectCategoryModal({
  projectCategoryId,
  projectCategoryName,
  isOpen,
  onOpenChange,
  deleteProjectCategories,
  onSuccess,
}: DeleteProjectCategoryModalProps) {
  const t = useTranslations("projectCategories.DeleteProjectCategoryModal");
  const [state, action, isPending] = useActionState(
    deleteProjectCategories,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      onSuccess?.();
      onOpenChange?.(false);
    }
  }, [state.status, onSuccess]);

  useActionErrorToast(state);

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
