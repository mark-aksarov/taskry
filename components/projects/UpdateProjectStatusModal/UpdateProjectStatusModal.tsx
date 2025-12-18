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
import { ActionFn, UpdateProjectStatusState } from "@/lib/actions/types";

const initialState: UpdateProjectStatusState = {
  status: null,
  message: null,
};

interface UpdateProjectStatusModalProps {
  projectId: number;
  nextStatus: string;
  modalTextKey: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  updateStatusAction: ActionFn<UpdateProjectStatusState>;
}

export function UpdateProjectStatusModal({
  projectId,
  nextStatus,
  modalTextKey,
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
        id: projectId,
        nextStatus,
      });
    });

    onOpenChange(false);
  };

  useActionErrorToast(state);

  return (
    <ConfirmModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <DialogHeading>{t("heading")}</DialogHeading>

      <ConfirmModalText>{t(`text.${modalTextKey}`)}</ConfirmModalText>

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
