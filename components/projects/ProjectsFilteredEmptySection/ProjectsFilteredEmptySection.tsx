"use client";

import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";

import { useTranslations } from "next-intl";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { ProjectListItemSkeleton } from "../ProjectListItem";
import { AbsoluteCenter } from "@/components/common/AbsoluteCenter";
import { FiltersResetButton } from "@/components/common/FiltersResetButton";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export function ProjectsFilteredEmptySection() {
  const t = useTranslations("projects.ProjectsFilteredEmptySection");
  const { isFilteringPending } = usePageTransition();

  if (isFilteringPending) {
    return (
      <List data-test="projects-list">
        <Repeat items={10} renderItem={() => <ProjectListItemSkeleton />} />
      </List>
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
