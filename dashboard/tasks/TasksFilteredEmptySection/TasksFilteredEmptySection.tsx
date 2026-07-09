"use client";

import {
  FallbackSection,
  FallbackSectionHeading,
  FallbackSectionDescription,
} from "@/common/FallbackSection";

import { useTranslations } from "next-intl";
import { TaskGridSkeleton } from "../TaskGrid";
import { useViewMode } from "@/dashboard/common/ViewMode";
import { AbsoluteCenter } from "@/dashboard/common/AbsoluteCenter";
import { FiltersResetButton } from "@/dashboard/common/FiltersResetButton";
import { usePageTransition } from "@/dashboard/common/PageTransitionContext";

export function TasksFilteredEmptySection() {
  const t = useTranslations("dashboard.tasks.TasksFilteredEmptySection");
  const { isFilteringPending } = usePageTransition();
  const { viewMode } = useViewMode();

  if (isFilteringPending) {
    return <TaskGridSkeleton viewMode={viewMode} showCheckbox />;
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
