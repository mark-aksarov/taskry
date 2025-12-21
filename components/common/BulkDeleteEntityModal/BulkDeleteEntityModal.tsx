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
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";

const initialState: ActionState = {
  status: null,
  message: null,
};

interface BulkDeleteEntityModalProps<T> {
  entityIds: T[];
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  deleteAction: ActionFn<ActionState, T[]>;
  translationNamespace: string;
  itemCount?: number;
}

export function BulkDeleteEntityModal<T>({
  entityIds,
  isOpen,
  onOpenChange,
  deleteAction,
  translationNamespace,
}: BulkDeleteEntityModalProps<T>) {
  const t = useTranslations(translationNamespace);
  const [state, action, pending] = useActionState(deleteAction, initialState);

  const handleDelete = () => {
    startTransition(() => action(entityIds));
    onOpenChange(false);
  };

  useActionErrorToast(state);

  return (
    <ConfirmModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          count: entityIds.length,
        })}
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
