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
import { useDeleteTasks } from "../DeleteTasksContext";
import { useSelectedTasks } from "../SelectedTasksContext";
import { ActionFn, ActionState, DeleteTasksPayload } from "@/lib/actions/types";
import { useDeleteEntityActionState } from "@/lib/hooks/useDeleteEntityActionState";

interface DeleteTasksModalProps extends ModalProps {
  taskIds: number[];
  deleteTasks: ActionFn<ActionState, DeleteTasksPayload>;
}

export function DeleteTasksModal({
  taskIds,
  isOpen,
  onOpenChange,
  deleteTasks,
}: DeleteTasksModalProps) {
  const t = useTranslations("tasks.DeleteTasksModal");

  const { startTransition, setTaskIds: setDeleteTaskIds } = useDeleteTasks();

  const [, action] = useDeleteEntityActionState({
    deleteEntity: deleteTasks,
    successMessage: t("successMessage"),
  });

  const { clear: clearSelectedItems } = useSelectedTasks();

  function handleDelete() {
    onOpenChange?.(false);

    // Clear selected items
    clearSelectedItems();

    // Used to show an overlay on the selected tasks
    setDeleteTaskIds(taskIds);

    const payload = {
      ids: taskIds,
      shouldRedirect: false,
    };

    startTransition(() => action(payload));
  }

  return (
    <ConfirmModal
      data-test="delete-tasks-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          count: taskIds.length,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-tasks-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
