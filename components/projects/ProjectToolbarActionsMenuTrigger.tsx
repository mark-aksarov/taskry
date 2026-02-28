"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";

import { useState } from "react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { DialogHeader } from "../ui/Dialog";
import { ProjectStatus } from "@/generated/prisma/enums";
import { GuestModeModal } from "../common/GuestModeModal";
import { DeleteProjectsModal } from "./DeleteProjectsModal";
import { ToolbarActionsMenuTrigger } from "../common/Toolbar";
import { useCurrentUser } from "../common/CurrentUserContext";
import { useSelectedProjects } from "./SelectedProjectsContext";
import { Check, CircleEllipsis, Clock, Trash } from "lucide-react";
import { useUpdateProjectStatuses } from "./UpdateProjectStatusesContext";
import { useUpdateEntityStatusActionState } from "@/lib/hooks/useUpdateEntityStatusActionState";

interface ProjectToolbarActionsMenuTriggerProps {
  deleteProjects: ActionFn<ActionState, DeleteProjectsPayload>;
  updateProjectStatuses: ActionFn<ActionState, UpdateProjectStatusesPayload>;
}

export const ProjectToolbarActionsMenuTrigger = ({
  deleteProjects,
  updateProjectStatuses,
}: ProjectToolbarActionsMenuTriggerProps) => {
  const t = useTranslations("projects.ProjectToolbarActionsMenuTrigger");

  // Guest mode
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Delete confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Action for updating project status
  const [, updateProjectStatusAction] = useUpdateEntityStatusActionState({
    updateEntityStatus: updateProjectStatuses,
  });
  const {
    startTransition: startUpdateProjectStatusesTransition,
    setProjectIds: setUpdateProjectStatusesIds,
  } = useUpdateProjectStatuses();

  // Selected with checkbox projects
  const selected = useSelectedProjects();

  // Menu actions: show delete modal, update project status
  const handleAction = (key: Key) => {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    if (key === "delete") {
      setIsDeleteModalOpen(true);
    } else {
      setUpdateProjectStatusesIds(selected.ids);

      startUpdateProjectStatusesTransition(() => {
        const nextStatus = key as ProjectStatus;

        updateProjectStatusAction({
          ids: selected.ids,
          nextStatus,
        });
      });
    }
  };

  // disable menu items if selected projects have the same status.
  const disabledKeys = Object.values(ProjectStatus).filter((status) =>
    selected.items.every((project) => project.status === status),
  );

  return (
    <>
      <ToolbarActionsMenuTrigger
        onAction={handleAction}
        disabledKeys={disabledKeys}
        renderDialogHeader={() => (
          <DialogHeader>{t("dialogHeading")}</DialogHeader>
        )}
        selectedIds={selected.ids}
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
        projectIds={selected.ids}
        deleteProjects={deleteProjects}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />

      {/* Guest mode modal */}
      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
};
