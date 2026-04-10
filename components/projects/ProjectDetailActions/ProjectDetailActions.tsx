"use client";

import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDeleteProject } from "../DeleteProjectContext";
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

  function handleDeletePress() {
    guestGuard(() => onDeleteModalOpenChange(true));
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
    </div>
  );
}
