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
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { useDeleteEntityActionState } from "@/lib/hooks/useDeleteEntityActionState";
import { useDeleteProjectCategoryTransition } from "../DeleteProjectCategoryTransitionContext";

interface DeleteProjectCategoryModalProps extends ModalProps {
  projectCategoryId: number;
  projectCategoryName: string;
  deleteProjectCategory: ActionFn<ActionState, number[]>;
}

export function DeleteProjectCategoryModal({
  projectCategoryId,
  projectCategoryName,
  deleteProjectCategory,
  isOpen,
  onOpenChange,
}: DeleteProjectCategoryModalProps) {
  const t = useTranslations("projectCategories.DeleteProjectCategoryModal");

  const { startTransition } = useDeleteProjectCategoryTransition();

  const [, action] = useDeleteEntityActionState({
    deleteEntity: deleteProjectCategory,
    successMessage: t("successMessage"),
  });

  const { remove: removeSelected } = useSelectedItems();

  function handleDelete() {
    //Remove the company from the selection to prevent access to it
    removeSelected(projectCategoryId);

    //close modal before deleting
    onOpenChange?.(false);
    startTransition(() => action([projectCategoryId]));
  }

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
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-project-category-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
