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

interface BaseDeleteProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  deleteAction: ActionFn<DeleteProjectState, number | number[]>;
}

interface SingleDeleteProps extends BaseDeleteProps {
  projectIds: [number];
  projectTitle: string;
}

interface BulkDeleteProps extends BaseDeleteProps {
  projectIds: number[];
  projectTitle?: never;
}

type DeleteProjectModalProps = SingleDeleteProps | BulkDeleteProps;

export function DeleteProjectModal({
  projectIds,
  projectTitle,
  isOpen,
  onOpenChange,
  deleteAction,
}: DeleteProjectModalProps) {
  const t = useTranslations("projects.DeleteProjectModal");
  const [state, action, pending] = useActionState(deleteAction, initialState);

  const isBulk = projectIds.length > 1;

  const handleDeleteProjects = () => {
    const payload = isBulk ? projectIds : projectIds[0];

    startTransition(() => {
      action(payload);
    });

    onOpenChange(false);
  };

  useActionErrorToast(state);

  return (
    <ConfirmModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <DialogHeading>{isBulk ? t("bulkHeading") : t("heading")}</DialogHeading>

      <ConfirmModalText>
        {isBulk
          ? t("bulkText", { count: projectIds.length })
          : t.rich("text", {
              strong: (chunks) => <strong>{chunks}</strong>,
              projectTitle: projectTitle as string,
            })}
      </ConfirmModalText>

      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("deleteButton")}
          onConfirm={handleDeleteProjects}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
