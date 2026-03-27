"use client";

import { useTranslations } from "next-intl";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { useProjectCreatorFiltersModal } from "./ProjectCreatorFiltersModalContext";

export function ProjectCreatorFiltersModalTrigger() {
  const t = useTranslations("projects.ProjectCreatorFiltersModalTrigger");
  const { onOpenChange } = useProjectCreatorFiltersModal();

  return <FilterButtonMobile mode="single" label={t("buttonLabel")} />;
}
