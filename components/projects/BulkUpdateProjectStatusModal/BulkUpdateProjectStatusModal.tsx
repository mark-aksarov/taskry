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
import { ActionFn, UpdateProjectStatusesState } from "@/lib/actions/types";

const initialState: UpdateProjectStatusesState = {
  status: null,
  message: null,
};

interface BulkUpdateProjectStatusModalProps {
  projectIds: number[];
  nextStatus: string;
  modalTextKey: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  updateStatusAction: ActionFn<UpdateProjectStatusesState>;
}

export function BulkUpdateProjectStatusModal({
  projectIds,
  nextStatus,
  modalTextKey,
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
        id: projectIds,
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
