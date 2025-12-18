"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import { CircleX } from "lucide-react";
import { useTranslations } from "next-intl";
import { DialogHeading } from "@/components/ui";
import { ToastContext } from "@/components/ui/Toast";
import { ActionFn, DeleteProjectState } from "@/lib/actions/types";
import { startTransition, useActionState, useContext, useEffect } from "react";

const initialState: DeleteProjectState = {
  status: null,
  message: null,
};

interface DeleteProjectModalProps {
  projectId: number;
  projectTitle: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  deleteAction: ActionFn<DeleteProjectState>;
}

export function DeleteProjectModal({
  projectId,
  projectTitle,
  isOpen,
  onOpenChange,
  deleteAction,
}: DeleteProjectModalProps) {
  const toastQueue = useContext(ToastContext);

  const t = useTranslations("projects.DeleteProjectModal");

  const [state, action, pending] = useActionState(deleteAction, initialState);

  const handleDeleteProject = () => {
    startTransition(() => {
      action(projectId);
    });
  };

  useEffect(() => {
    onOpenChange(false);

    if (state.status === "error") {
      toastQueue.add(
        {
          title: state.message!,
          iconLeft: <CircleX size={16} strokeWidth={1.5} absoluteStrokeWidth />,
        },
        { timeout: 5000 },
      );
    }
  }, [state]);

  return (
    <ConfirmModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <DialogHeading>{t("heading")}</DialogHeading>
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
