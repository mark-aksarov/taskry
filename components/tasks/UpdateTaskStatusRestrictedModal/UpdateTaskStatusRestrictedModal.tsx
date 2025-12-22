"use client";

import {
  ActionFn,
  ActionState,
  UpdateTaskStatusesPayload,
} from "@/lib/actions/types";

import {
  ConfirmModal,
  ConfirmModalText,
  ConfirmModalActions,
  ConfirmModalCancelButton,
  ConfirmModalConfirmButton,
} from "@/components/common/ConfirmModal";

import { useTranslations } from "next-intl";
import { TaskStatus } from "@/generated/prisma/enums";
import { startTransition, useActionState } from "react";
import { DialogHeading, ModalProps } from "@/components/ui";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";

const initialState: ActionState = {
  status: null,
  message: null,
};

export type UpdateTaskStatusRestrictedModalProps = {
  taskIds: number[];
  nextStatus: TaskStatus;
  updateStatusAction: ActionFn<ActionState, UpdateTaskStatusesPayload>;
} & Pick<ModalProps, "isOpen" | "onOpenChange">;

export function UpdateTaskStatusRestrictedModal({
  isOpen,
  onOpenChange,
  taskIds,
  nextStatus,
  updateStatusAction,
}: UpdateTaskStatusRestrictedModalProps) {
  const t = useTranslations("tasks.UpdateTaskStatusRestrictedModal");
  const [state, action] = useActionState(updateStatusAction, initialState);

  const handleConfirm = () => {
    startTransition(() => action({ ids: taskIds, nextStatus }));
    onOpenChange?.(false);
  };

  useActionErrorToast(state);

  return (
    <ConfirmModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>{t("text")}</ConfirmModalText>
      <ConfirmModalActions>
        <ConfirmModalCancelButton label={t("cancelButton")} />
        <ConfirmModalConfirmButton
          label={t("confirmButton")}
          onConfirm={handleConfirm}
        />
      </ConfirmModalActions>
    </ConfirmModal>
  );
}
