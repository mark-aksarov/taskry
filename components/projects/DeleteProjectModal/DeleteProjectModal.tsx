"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
} from "@/lib/actions/types";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui/Modal";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { BaseDeleteProjectModal } from "./BaseDeleteProjectModal";
import { useDeleteProjectTransition } from "../DeleteProjectTransitionContext";
import { useDeleteEntityActionState } from "@/lib/hooks/useDeleteEntityActionState";

interface DeleteProjectModalProps extends ModalProps {
  projectId: number;
  projectTitle: string;
  deleteProject: ActionFn<ActionState, DeleteProjectsPayload>;
}

export function DeleteProjectModal({
  projectId,
  projectTitle,
  isOpen,
  onOpenChange,
  deleteProject,
}: DeleteProjectModalProps) {
  const t = useTranslations("projects.DeleteProjectModal");

  const { startTransition } = useDeleteProjectTransition();

  const [, action] = useDeleteEntityActionState({
    deleteEntity: deleteProject,
    successMessage: t("successMessage"),
  });

  const { remove: removeSelected } = useSelectedProjects();

  function handleDelete() {
    //Remove the project from the selection to prevent access to it
    removeSelected(projectId);

    //close modal before deleting
    onOpenChange?.(false);
    startTransition(() => action({ ids: [projectId], shouldRedirect: false }));
  }

  return (
    <BaseDeleteProjectModal
      onDelete={handleDelete}
      projectTitle={projectTitle}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    />
  );
}
