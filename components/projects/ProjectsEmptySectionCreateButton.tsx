"use client";

import { useTranslations } from "next-intl";
import { useCreateProject } from "./CreateProjectContext";
import { EmptySectionButton } from "@/components/common/EmptySection";

export function ProjectsEmptySectionCreateButton() {
  const t = useTranslations("projects.ProjectsEmptySectionCreateButton");

  const { onModalOpenChange } = useCreateProject();

  return (
    <EmptySectionButton onPress={() => onModalOpenChange(true)}>
      {t("label")}
    </EmptySectionButton>
  );
}
