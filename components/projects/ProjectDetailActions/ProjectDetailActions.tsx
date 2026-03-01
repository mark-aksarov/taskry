"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
} from "@/lib/actions/types";

import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { startTransition, useState } from "react";
import { EditProjectModal } from "../EditProjectModal";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { BaseDeleteProjectModal } from "../DeleteProjectModal";
import { GuestModeModal } from "@/components/common/GuestModeModal";
import { NavigationButton } from "@/components/common/NavigationButton";
import { useCurrentUser } from "@/components/common/CurrentUserContext";
import { useUpdateProjectTransition } from "../UpdateProjectTransitionContext";
import { useDeleteEntityPageActionState } from "@/lib/hooks/useDeleteEntityPageActionState";
import { DetailActionsCommentsModalTrigger } from "@/components/common/DetailActionsCommentsModalTrigger";

interface ProjectDetailActionsProps {
  projectId: number;
  projectTitle: string;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
  deleteProject: ActionFn<ActionState, DeleteProjectsPayload>;
  projectCommentsContainer: React.ReactNode;
  editProjectFormContainer: React.ReactNode;
}

export function ProjectDetailActions({
  projectId,
  projectTitle,
  sendComment,
  updateComment,
  deleteProject,
  projectCommentsContainer,
  editProjectFormContainer,
}: ProjectDetailActionsProps) {
  const t = useTranslations("projects.ProjectDetailActions");

  // Deleting the project
  const [, action, isDeletePending] = useDeleteEntityPageActionState({
    deleteEntity: deleteProject,
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Guest mode
  const { isGuest } = useCurrentUser();
  const [isGuestModeModalOpen, setIsGuestModeModalOpen] = useState(false);

  // Editing the project
  const { isPending: isUpdatePending } = useUpdateProjectTransition();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function handleDeletePress() {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    setIsDeleteModalOpen(true);
  }

  function handleEditPress() {
    if (isGuest) {
      setIsGuestModeModalOpen(true);
      return;
    }

    setIsEditModalOpen(true);
  }

  function handleDelete() {
    setIsDeleteModalOpen(false);
    startTransition(() => action({ ids: [projectId], shouldRedirect: true }));
  }

  return (
    <>
      <div className="flex flex-col gap-2.5">
        <NavigationButton
          isPending={isDeletePending}
          data-test="delete-project-button"
          onPress={handleDeletePress}
          variant="secondary"
          iconLeft={<Trash size={18} strokeWidth={1.5} absoluteStrokeWidth />}
          label={t("delete")}
        />
        <NavigationButton
          isPending={isUpdatePending}
          data-test="edit-project-button"
          onPress={handleEditPress}
          variant="secondary"
          iconLeft={<Pencil size={18} strokeWidth={1.5} absoluteStrokeWidth />}
          label={t("edit")}
        />
        <DetailActionsCommentsModalTrigger
          modal={
            <ProjectCommentsModal
              projectId={projectId}
              projectCommentsContainer={projectCommentsContainer}
              sendComment={sendComment}
              updateComment={updateComment}
            />
          }
          label={t("comments")}
        />
      </div>

      {/* Modal for editing project details */}
      <EditProjectModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        editProjectFormContainer={editProjectFormContainer}
      />

      {/* Modal for confirming project deletion */}
      <BaseDeleteProjectModal
        onDelete={handleDelete}
        projectTitle={projectTitle}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />

      <GuestModeModal
        isOpen={isGuestModeModalOpen}
        onOpenChange={setIsGuestModeModalOpen}
      />
    </>
  );
}
