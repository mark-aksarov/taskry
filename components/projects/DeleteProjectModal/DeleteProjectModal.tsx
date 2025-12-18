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
  projectIds: number;
  projectTitle: string;
}

interface BulkDeleteProps extends BaseDeleteProps {
  projectIds: number[];
  projectTitle?: never;
}

type DeleteProjectModalProps = SingleDeleteProps | BulkDeleteProps;

export function DeleteProjectModal(props: DeleteProjectModalProps) {
  const t = useTranslations("projects.DeleteProjectModal");
  const [state, action, pending] = useActionState(
    props.deleteAction,
    initialState,
  );

  const handleDeleteProjects = () => {
    startTransition(() => {
      action(props.projectIds);
    });

    props.onOpenChange(false);
  };

  useActionErrorToast(state);

  return (
    <ConfirmModal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogHeading>
        {"projectTitle" in props ? t("heading") : t("bulkHeading")}
      </DialogHeading>

      <ConfirmModalText>
        {"projectTitle" in props
          ? t.rich("text", {
              strong: (chunks) => <strong>{chunks}</strong>,
              projectTitle: props.projectTitle!,
            })
          : t("bulkText", { count: props.projectIds.length })}
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
