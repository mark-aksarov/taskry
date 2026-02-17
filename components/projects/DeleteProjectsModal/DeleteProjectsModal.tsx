"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
} from "@/lib/actions/types";

import { startTransition } from "react";
import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { DialogHeading } from "@/components/ui/Dialog";
import { useDeleteModalActionState } from "@/components/common/BaseDeleteModal";

interface DeleteProjectsModalProps extends ModalProps {
  projectIds: number[];
  deleteProjects: ActionFn<ActionState, DeleteProjectsPayload>;
}

export function DeleteProjectsModal({
  projectIds,
  isOpen,
  onOpenChange,
  deleteProjects,
}: DeleteProjectsModalProps) {
  const t = useTranslations("projects.DeleteProjectsModal");

  const [_, action, isPending] = useDeleteModalActionState<number[]>({
    deleteEntity: deleteProjects,
    onOpenChange,
  });

  const handleDelete = () => {
    startTransition(() => action(projectIds));
  };

  return (
    <ConfirmModal
      data-test="delete-projects-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          count: projectIds.length,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          isPending={isPending}
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-projects-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
