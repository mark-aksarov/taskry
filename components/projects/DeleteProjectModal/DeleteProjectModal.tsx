"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalError,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import { useTranslations } from "next-intl";
import { DialogHeading } from "@/components/ui";
import { DeleteProjectActionState } from "@/lib/actions/types";
import { startTransition, useActionState, useEffect } from "react";

const initialState: DeleteProjectActionState = {
  status: null,
  message: null,
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
    if (state.status === "success") {
      onOpenChange(false);
    }
  }, [state.status]);

  return (
    <ConfirmModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <DialogHeading>{t("heading")}</DialogHeading>
      {state.status === "error" && (
        <ConfirmModalError>{state.message}</ConfirmModalError>
      )}
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
