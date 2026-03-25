"use client";

import { useTranslations } from "next-intl";
import { Pencil, Trash } from "lucide-react";
import { startTransition, useState } from "react";
import { useDeleteProject } from "../DeleteProjectContext";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ProjectCommentsModal } from "../ProjectCommentsModal";
import { BaseDeleteProjectModal } from "../DeleteProjectModal";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { NavigationButton } from "@/components/common/NavigationButton";
import { DetailActionsCommentsModalTrigger } from "@/components/common/DetailActionsCommentsModalTrigger";
import { useUpdateProject } from "../UpdateProjectContext";
import { useUpdateProjectModal } from "../UpdateProjectModal";

interface ProjectDetailActionsProps {
  projectId: number;
  projectTitle: string;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
  projectCommentsContainer: React.ReactNode;
}

export function ProjectDetailActions({
  projectId,
  projectTitle,
  sendComment,
  updateComment,
  projectCommentsContainer,
}: ProjectDetailActionsProps) {
  const t = useTranslations("projects.ProjectDetailActions");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete project: action state + form modal state
  const { isPending: isDeletePending, action: deleteAction } =
    useDeleteProject();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Edit project: action state + form modal state from context
  const { isPending: isUpdatePending } = useUpdateProject();
  const { onOpenChange: onUpdateProjectModalOpenChange } =
    useUpdateProjectModal();

  function handleDeletePress() {
    guestGuard(() => setIsDeleteModalOpen(true));
  }

  function handleEditPress() {
    guestGuard(() => onUpdateProjectModalOpenChange(true));
  }

  // Close modal and delete project
  // We should redirect to the project list page after deletion
  function handleDelete() {
    setIsDeleteModalOpen(false);
    startTransition(() =>
      deleteAction({ id: projectId, shouldRedirect: true }),
    );
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

      {/* Modal for confirming project deletion */}
      <BaseDeleteProjectModal
        onDelete={handleDelete}
        projectTitle={projectTitle}
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
      />
    </>
  );
}
