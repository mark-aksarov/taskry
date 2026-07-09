"use client";

import {
  FallbackSection,
  FallbackSectionHeading,
  FallbackSectionDescription,
} from "@/common/FallbackSection";

import { useTranslations } from "next-intl";
import { ProjectGridSkeleton } from "../ProjectGrid";
import { useViewMode } from "@/dashboard/common/ViewMode";
import { AbsoluteCenter } from "@/dashboard/common/AbsoluteCenter";
import { FiltersResetButton } from "@/dashboard/common/FiltersResetButton";
import { usePageTransition } from "@/dashboard/common/PageTransitionContext";

export function ProjectsFilteredEmptySection() {
  const t = useTranslations("dashboard.projects.ProjectsFilteredEmptySection");
  const { isFilteringPending } = usePageTransition();
  const { viewMode } = useViewMode();

  if (isFilteringPending) {
    return <ProjectGridSkeleton viewMode={viewMode} />;
  }

  return (
    <AbsoluteCenter className="w-full">
      <FallbackSection>
        <FallbackSectionHeading>{t("heading")}</FallbackSectionHeading>
        <FallbackSectionDescription className="max-w-[500px]">
          {t("description")}
        </FallbackSectionDescription>
        <FiltersResetButton />
      </FallbackSection>
    </AbsoluteCenter>
  );
}
