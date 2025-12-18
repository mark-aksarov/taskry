"use client";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import { useTranslations } from "next-intl";
import { DialogHeading } from "@/components/ui";
import { startTransition, useActionState } from "react";
import { ActionFn, DeleteProjectState } from "@/lib/actions/types";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";

const initialState: DeleteProjectState = {
  status: null,
  message: null,
};

interface BulkDeleteProjectModalProps {
  projectIds: number[];
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  deleteAction: ActionFn<DeleteProjectState, number[]>;
}

export function BulkDeleteProjectModal({
  projectIds,
  isOpen,
  onOpenChange,
  deleteAction,
}: BulkDeleteProjectModalProps) {
  const t = useTranslations("projects.BulkDeleteProjectModal");
  const [state, action, pending] = useActionState(deleteAction, initialState);

  const handleDelete = () => {
    startTransition(() => action(projectIds));
    onOpenChange(false);
  };

  useActionErrorToast(state);

  return (
    <ConfirmModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t("text", { count: projectIds.length })}
      </ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("deleteButton")}
          onConfirm={handleDelete}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
