"use client";

import {
  ProjectGridLargeSkeleton,
  ProjectGridMobileSkeleton,
} from "../ProjectGrid";

import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";

import { useTranslations } from "next-intl";
import { ProjectListSkeleton } from "../ProjectList";
import { useViewMode } from "@/components/common/ViewMode";
import { AbsoluteCenter } from "@/components/common/AbsoluteCenter";
import { FiltersResetButton } from "@/components/common/FiltersResetButton";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export function ProjectsFilteredEmptySection() {
  const t = useTranslations("projects.ProjectsFilteredEmptySection");
  const { isFilteringPending } = usePageTransition();
  const { viewMode } = useViewMode();

  if (isFilteringPending) {
    return (
      <>
        {viewMode === "list" ? (
          <ProjectListSkeleton className="max-md:hidden" items={10} />
        ) : (
          <ProjectGridLargeSkeleton className="max-md:hidden" items={10} />
        )}

        <ProjectGridMobileSkeleton className="md:hidden" items={10} />
      </>
    );
  }

  return (
    <AbsoluteCenter className="w-full">
      <EmptySection>
        <EmptySectionHeading>{t("heading")}</EmptySectionHeading>
        <EmptySectionDescription className="max-w-[500px]">
          {t("description")}
        </EmptySectionDescription>
        <FiltersResetButton />
      </EmptySection>
    </AbsoluteCenter>
  );
}
