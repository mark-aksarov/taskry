"use client";

import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { useDeleteProject } from "../DeleteProjectContext";
import { NavigationButton } from "@/dashboard/common/NavigationItem";

export function ProjectDetailActions() {
  const t = useTranslations("dashboard.projects.ProjectDetailActions");

  // Delete project: action state + form modal state
  const { isPending: isDeletePending } = useDeleteProject();
  const { onOpenChange: onDeleteModalOpenChange } = useModal("deleteProject");

  function handleDeletePress() {
    onDeleteModalOpenChange(true);
  }

  return (
    <div className="flex flex-col gap-2.5">
      <NavigationButton
        isPending={isDeletePending}
        data-test="delete-project-button"
        onPress={handleDeletePress}
        variant="secondary"
        iconLeft={<Trash size={18} />}
        label={t("delete")}
      />
    </div>
  );
}
