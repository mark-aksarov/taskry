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

type Id = number | string;

interface DeleteEntityModalProps<T extends Id> {
  entityId: T;
  entityName: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  deleteAction: ActionFn<ActionState, T[]>;
  translationNamespace: string;
}

export function DeleteEntityModal<T extends Id>({
  entityId,
  entityName,
  isOpen,
  onOpenChange,
  deleteAction,
  translationNamespace,
}: DeleteEntityModalProps<T>) {
  const t = useTranslations(translationNamespace);
  const [state, action] = useActionState(deleteAction, initialState);

  const handleDelete = () => {
    startTransition(() => action([entityId]));
    onOpenChange(false);
  };

  useActionErrorToast(state);

  return (
    <ConfirmModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <DialogHeading>{t("heading")}</DialogHeading>
      <ConfirmModalText>
        {t.rich("text", {
          strong: (chunks) => <strong>{chunks}</strong>,
          name: entityName,
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
