"use client";

import { useTranslations } from "next-intl";
import { useCreateProjectModal } from "./CreateProjectModal";
import { EmptySectionButton } from "@/components/common/EmptySection";

export function ProjectsEmptySectionCreateButton() {
  const t = useTranslations("projects.ProjectsEmptySectionCreateButton");

  const { onOpenChange: onCreateProjectModalOpenChange } =
    useCreateProjectModal();

  return (
    <EmptySectionButton onPress={() => onCreateProjectModalOpenChange(true)}>
      {t("label")}
    </EmptySectionButton>
  );
}
