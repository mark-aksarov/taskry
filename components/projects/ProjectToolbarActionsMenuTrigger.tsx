"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";

import {
  ToolbarActionsMenuTrigger,
  ToolbarActionsButtonMobile,
  ToolbarActionsButtonDesktop,
  ToolbarActionsMenuDialogHeader,
} from "../common/Toolbar";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
import { DeleteProjectsModal } from "./DeleteProjectsModal";
import { startTransition, useActionState, useState } from "react";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { useProjectSelection } from "@/lib/hooks/useProjectSelection";

interface ProjectToolbarActionsMenuTriggerProps {
  deleteAction: ActionFn<ActionState, DeleteProjectsPayload>;
  updateStatusAction: ActionFn<ActionState, UpdateProjectStatusesPayload>;
}

const updateStatusInitialState: ActionState = {
  status: null,
  message: null,
};

export const ProjectToolbarActionsMenuTrigger = ({
  deleteAction,
  updateStatusAction,
}: ProjectToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("projects.ProjectToolbarActionsMenuTrigger");

  // State for showing/hiding the delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State and handlers for updating project status
  const [updateStatusState, updateStatus, updateStatusPending] = useActionState(
    updateStatusAction,
    updateStatusInitialState,
  );

  // Show toast notification if updating status fails
  useActionErrorToast(updateStatusState);

  // Handle menu actions: open delete modal or update project status
  const handleAction = (key: Key) => {
    if (key === "delete") {
      setIsDeleteModalOpen(true);
    } else {
      startTransition(() => {
        updateStatus({
          ids: projectIds,
          nextStatus: key as ProjectStatus,
        });
      });
    }
  };

  // get selected project IDs from project selection context
  const { selectedIds: projectIds, clearSelectedIds } = useProjectSelection();

  const isDisabled = projectIds.length === 0;

  return (
    <>
      <ToolbarActionsMenuTrigger
        onAction={handleAction}
        renderDialogHeader={() => (
          <ToolbarActionsMenuDialogHeader>
            {t("actions")}
          </ToolbarActionsMenuDialogHeader>
        )}
        renderButton={() => (
          <>
            <ToolbarActionsButtonMobile isDisabled={isDisabled} />
            <ToolbarActionsButtonDesktop isDisabled={isDisabled} />
          </>
        )}
      >
        <Item textValue={t("delete")} key="delete">
          <Trash size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("delete")}
        </Item>
        <Item textValue={t("pending")} key="pending">
          <CircleEllipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("pending")}
        </Item>
        <Item textValue={t("active")} key="active">
          <Check size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("active")}
        </Item>
        <Item textValue={t("completed")} key="completed">
          <Clock size={16} strokeWidth={1.5} absoluteStrokeWidth />
          {t("completed")}
        </Item>
      </ToolbarActionsMenuTrigger>

      {/* Modal for confirming project deletion */}
      <DeleteProjectsModal
        projectIds={projectIds}
        deleteAction={deleteAction}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onSuccess={clearSelectedIds}
      />
    </>
  );
};
