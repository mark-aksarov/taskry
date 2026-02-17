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

interface DeleteProjectModalProps extends ModalProps {
  projectId: number;
  projectTitle: string;
  deleteProjects: ActionFn<ActionState, DeleteProjectsPayload>;
}

export function DeleteProjectModal({
  projectId,
  projectTitle,
  isOpen,
  onOpenChange,
  deleteProjects,
}: DeleteProjectModalProps) {
  const t = useTranslations("projects.DeleteProjectModal");

  const [_, action, isPending] = useDeleteModalActionState<number[]>({
    deleteEntity: deleteProjects,
    onOpenChange,
  });

  const handleDelete = () => {
    startTransition(() => action([projectId]));
  };

  return (
    <ConfirmModal
      data-test="delete-project-modal"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          name: projectTitle,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          isPending={isPending}
          label={t("deleteButton")}
          onConfirm={handleDelete}
          data-test="delete-project-modal-confirm-button"
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
