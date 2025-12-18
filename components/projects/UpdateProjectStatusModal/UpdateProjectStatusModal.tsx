"usse client";

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
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import {
  ActionFn,
  UpdateProjectStatusesPayload,
  UpdateProjectStatusesState,
} from "@/lib/actions/types";

const initialState: UpdateProjectStatusesState = {
  status: null,
  message: null,
};

interface UpdateProjectStatusModalProps {
  projectId: number;
  nextStatus: string;
  textKey: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  updateStatusAction: ActionFn<
    UpdateProjectStatusesState,
    UpdateProjectStatusesPayload
  >;
}

export function UpdateProjectStatusModal({
  projectId,
  nextStatus,
  textKey,
  isOpen,
  onOpenChange,
  updateStatusAction,
}: UpdateProjectStatusModalProps) {
  const t = useTranslations("projects.UpdateProjectStatusModal");

  const [state, action, pending] = useActionState(
    updateStatusAction,
    initialState,
  );

  const handleUpdateProjectStatus = () => {
    startTransition(() => {
      action({
        ids: [projectId],
        nextStatus,
      });
    });

    onOpenChange(false);
  };

  useActionErrorToast(state);

  return (
    <ConfirmModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <DialogHeading>{t("heading")}</DialogHeading>

      <ConfirmModalText>{t(`text.${textKey}`)}</ConfirmModalText>

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
