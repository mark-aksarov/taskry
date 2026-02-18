"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { KeyRound, Trash } from "lucide-react";
import { EditProjectModal } from "../EditProjectModal";
import { DeleteProjectModal } from "../DeleteProjectModal";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { NavigationButton } from "@/components/common/NavigationButton";
import { DetailActionsCommentsModalTrigger } from "@/components/common/DetailActionsCommentsModalTrigger";

interface ProjectDetailActionsProps {
  guestMode: boolean;
  projectId: number;
  projectTitle: string;
  commentsModal: React.ReactNode;
  deleteProject: ActionFn<ActionState, number[]>;
  editProjectFormContainer: React.ReactNode;
}

export function ProjectDetailActions({
  guestMode,
  projectId,
  projectTitle,
  commentsModal,
  deleteProject,
  editProjectFormContainer,
}: ProjectDetailActionsProps) {
  const t = useTranslations("projects.ProjectDetailActions");

  // Guest mode modal
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Modal state for editing the task
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Modal state for deleting the task
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function handleDeletePress() {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    setIsDeleteModalOpen(true);
  }

  function handleEditPress() {
    if (guestMode) {
      setIsGuestModeModalOpen(true);
      return;
    }

    setIsEditModalOpen(true);
  }

  return (
    <>
      <div className="flex flex-col gap-2.5">
        <NavigationButton
          data-test="delete-project-button"
          onPress={handleDeletePress}
          variant="secondary"
        >
          <Trash size={18} strokeWidth={1.5} absoluteStrokeWidth />
          {t("delete")}
        </NavigationButton>
        <NavigationButton
          data-test="edit-project-button"
          onPress={handleEditPress}
          variant="secondary"
        >
          <KeyRound size={18} strokeWidth={1.5} absoluteStrokeWidth />
          {t("edit")}
        </NavigationButton>
        <DetailActionsCommentsModalTrigger modal={commentsModal}>
          {t("comments")}
        </DetailActionsCommentsModalTrigger>
      </div>

      {/* Modal for editing project details */}
      <EditProjectModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        editProjectFormContainer={editProjectFormContainer}
      />

      {/* Modal for confirming project deletion */}
      <DeleteProjectModal
        projectId={projectId}
        projectTitle={projectTitle}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        deleteProjects={deleteProject}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
