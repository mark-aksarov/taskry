"use client";

import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";

import { useTranslations } from "next-intl";
import { TaskListSkeleton } from "../TaskList";
import { useViewMode } from "@/components/common/ViewMode";
import { AbsoluteCenter } from "@/components/common/AbsoluteCenter";
import { TaskGridLargeSkeleton, TaskGridMobileSkeleton } from "../TaskGrid";
import { FiltersResetButton } from "@/components/common/FiltersResetButton";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export function TasksFilteredEmptySection() {
  const t = useTranslations("tasks.TasksFilteredEmptySection");
  const { isFilteringPending } = usePageTransition();
  const { viewMode } = useViewMode();

  if (isFilteringPending) {
    return (
      <>
        {viewMode === "list" ? (
          <TaskListSkeleton className="max-md:hidden" items={10} />
        ) : (
          <TaskGridLargeSkeleton className="max-md:hidden" items={10} />
        )}

        <TaskGridMobileSkeleton className="md:hidden" items={10} />
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
