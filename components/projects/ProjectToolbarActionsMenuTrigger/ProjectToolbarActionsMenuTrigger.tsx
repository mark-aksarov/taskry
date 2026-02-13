"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";

import {
  ToolbarMenuTrigger,
  ToolbarActionsButtonMobile,
  ToolbarActionsButtonDesktop,
} from "../../common/Toolbar";

import { Item, Key } from "react-stately";
import { DialogHeader } from "../../ui/Dialog";
import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
import { GuestModeModal } from "../../common/GuestModeModal";
import { DeleteProjectsModal } from "../DeleteProjectsModal";
import { startTransition, useActionState, useState } from "react";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { useActionErrorToast } from "@/lib/hooks/useActionErrorToast";
import { useProjectSelection } from "@/lib/hooks/useProjectSelection";

interface ProjectToolbarActionsMenuTriggerProps {
  guestMode: boolean;
  deleteAction: ActionFn<ActionState, DeleteProjectsPayload>;
  updateStatusAction: ActionFn<ActionState, UpdateProjectStatusesPayload>;
}

const updateStatusInitialState: ActionState = {
  status: null,
};

export const ProjectToolbarActionsMenuTrigger = ({
  guestMode,
  deleteAction,
  updateStatusAction,
}: ProjectToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("projects.ProjectToolbarActionsMenuTrigger");

  // Guest mode modal state
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State and handlers for updating project status
  const [updateStatusState, updateStatus, updateStatusPending] = useActionState(
    updateStatusAction,
    updateStatusInitialState,
  );

  // Show toast if updating status fails
  useActionErrorToast(updateStatusState, t("error.updateStatusError"));

  // Menu actions: show delete modal, update project status
  const handleAction = (key: Key) => {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

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

  const {
    selectedIds: projectIds,
    clearSelectedIds,
    selectedItems,
  } = useProjectSelection();

  // disable actions when selected projects have the same status
  const disabledKeys = Object.values(ProjectStatus).filter((status) =>
    selectedItems.every((task) => task.status === status),
  );

  const isDisabled = projectIds.length === 0;

  return (
    <>
      <ToolbarMenuTrigger
        onAction={handleAction}
        disabledKeys={disabledKeys}
        renderDialogHeader={() => (
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
        )}
        renderButton={() => (
          <>
            <ToolbarActionsButtonMobile
              data-test="project-toolbar-actions-button-mobile"
              isDisabled={isDisabled}
            />
            <ToolbarActionsButtonDesktop
              data-test="project-toolbar-actions-button-desktop"
              isDisabled={isDisabled}
            />
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
      </ToolbarMenuTrigger>

      {/* Modal for confirming project deletion */}
      <DeleteProjectsModal
        projectIds={projectIds}
        deleteAction={deleteAction}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onSuccess={clearSelectedIds}
      />

      {/* Guest mode modal */}
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
};
