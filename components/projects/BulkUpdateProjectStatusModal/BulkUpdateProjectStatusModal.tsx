"usse client";

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
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";

import { useTranslations } from "next-intl";
import { DialogHeading } from "@/components/ui";
import { startTransition, useActionState } from "react";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";

const initialState: ActionState = {
  status: null,
  message: null,
};

interface BulkUpdateProjectStatusModalProps {
  projectIds: number[];
  nextStatus: ProjectStatus;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  updateStatusAction: ActionFn<ActionState, UpdateProjectStatusesPayload>;
}

export function BulkUpdateProjectStatusModal({
  projectIds,
  nextStatus,
  isOpen,
  onOpenChange,
  updateStatusAction,
}: BulkUpdateProjectStatusModalProps) {
  const t = useTranslations("projects.BulkUpdateProjectStatusModal");

  const [state, action, pending] = useActionState(
    updateStatusAction,
    initialState,
  );

  const handleUpdateProjectStatus = () => {
    startTransition(() => {
      action({
        ids: projectIds,
        nextStatus,
      });
    });

    onOpenChange(false);
  };

  useActionErrorToast(state);

  return (
    <ConfirmModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <DialogHeading>{t("heading")}</DialogHeading>

      <ConfirmModalText>{t("text")}</ConfirmModalText>

      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("updateButton")}
          onConfirm={handleUpdateProjectStatus}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
