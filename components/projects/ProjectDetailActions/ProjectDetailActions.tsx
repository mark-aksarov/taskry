"use client";

import { useTranslations } from "next-intl";
import { useUpdateProject } from "../UpdateProjectContext";
import { useDeleteProject } from "../DeleteProjectContext";
import { MessageSquare, Pencil, Trash } from "lucide-react";
import { useModal } from "@/components/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { NavigationButton } from "@/components/common/NavigationButton";

export function ProjectDetailActions() {
  const t = useTranslations("projects.ProjectDetailActions");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  // Delete project: action state + form modal state
  const { isPending: isDeletePending } = useDeleteProject();
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteProject");

  // Edit project: action state + form modal state from context
  const { isPending: isUpdatePending } = useUpdateProject();
  const { onOpenChange: onUpdateModalOpenChange } = useModal("updateProject");

  const { onOpenChange: onCommentsModalOpenChange } =
    useModal("projectComments");

  function handleDeletePress() {
    guestGuard(() => onDeleteModalOpenChange(true));
  }

  function handleEditPress() {
    guestGuard(() => onUpdateModalOpenChange(true));
  }

  function handleCommentsPress() {
    onCommentsModalOpenChange(true);
  }

  return (
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
      <NavigationButton
        data-test="project-comments-button"
        onPress={handleCommentsPress}
        variant="secondary"
        iconLeft={
          <MessageSquare size={18} strokeWidth={1.5} absoluteStrokeWidth />
        }
        label={t("comments")}
      />
    </div>
  );
}
