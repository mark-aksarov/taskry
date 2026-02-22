"use client";

import {
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { useTranslations } from "next-intl";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { TaskListItemSkeleton } from "../TaskListItem";
import { PageEmptySection } from "@/components/common/PageEmptySection";
import { FiltersResetButton } from "@/components/common/FiltersResetButton";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export function TasksFilteredEmptySection() {
  const t = useTranslations("tasks.TasksFilteredEmptySection");
  const { isFilteringPending } = usePageTransition();

  if (isFilteringPending) {
    return (
      <List data-test="tasks-list">
        <Repeat
          items={10}
          renderItem={() => <TaskListItemSkeleton showCheckbox={true} />}
        />
      </List>
    );
  }

  return (
    <PageEmptySection>
      <EmptySectionHeading>{t("heading")}</EmptySectionHeading>
      <EmptySectionDescription>{t("description")}</EmptySectionDescription>
      <FiltersResetButton />
    </PageEmptySection>
  );
}
