"use client";

import { startTransition, useActionState, useEffect } from "react";
import {
  ConfirmModal,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
  ConfirmModalError,
  ConfirmModalText,
} from "@/components/common/ConfirmModal";
import { DeleteProjectActionState } from "@/lib/actions/types";
import { useTranslations } from "next-intl";
import { DialogHeading } from "@/components/ui";

const initialState: DeleteProjectActionState = {
  success: false,
  error: null,
};

interface DeleteProjectModalProps {
  projectId: number;
  projectTitle: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  deleteProjectAction: (
    prevState: any,
    id: number,
  ) => Promise<DeleteProjectActionState>;
}

export function DeleteProjectModal({
  projectId,
  projectTitle,
  isOpen,
  onOpenChange,
  deleteProjectAction,
}: DeleteProjectModalProps) {
  const t = useTranslations("projects.DeleteProjectModal");

  const [state, deleteAction, pending] = useActionState(
    deleteProjectAction,
    initialState,
  );

  const handleDeleteProject = () => {
    startTransition(() => {
      deleteAction(projectId);
    });
  };

  useEffect(() => {
    if (state.success) {
      onOpenChange(false);
    }
  }, [state.success]);

  return (
    <ConfirmModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <DialogHeading>{t("heading")}</DialogHeading>
      {state.error && <ConfirmModalError>t("error")</ConfirmModalError>}
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          projectTitle,
        })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("deleteButton")}
          onConfirm={handleDeleteProject}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
