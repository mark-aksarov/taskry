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
import { useDeleteProjectCategories } from "../DeleteProjectCategoriesContext";
import { useDeleteEntityActionState } from "@/lib/hooks/useDeleteEntityActionState";

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

  const {
    startTransition,
    setProjectCategoryIds: setDeletedProjectCategoryIds,
  } = useDeleteProjectCategories();

  const [, action] = useDeleteEntityActionState({
    deleteEntity: deleteProjectCategories,
    successMessage: t("successMessage"),
  });

  const { clear: clearSelectedItems } = useSelectedItems();

  function handleDelete() {
    onOpenChange?.(false);

    // Clear selected items
    clearSelectedItems();

    // Used to show an overlay on the selected project categories
    setDeletedProjectCategoryIds(projectCategoryIds);
    startTransition(() => action(projectCategoryIds));
  }

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
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-project-categories-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
