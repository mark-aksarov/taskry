"use client";

import {
  EmptySectionHeading,
  EmptySectionDescription,
  EmptySection,
} from "@/components/common/EmptySection";
import { useTranslations } from "next-intl";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { TaskListItemSkeleton } from "../TaskListItem";
import { AbsoluteCenter } from "@/components/common/AbsoluteCenter";
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
