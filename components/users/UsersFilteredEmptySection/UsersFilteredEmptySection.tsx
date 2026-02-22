"use client";

import {
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";
import { useTranslations } from "next-intl";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { UserListItemSkeleton } from "../UserListItem";
import { PageEmptySection } from "@/components/common/PageEmptySection";
import { FiltersResetButton } from "@/components/common/FiltersResetButton";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export function UsersFilteredEmptySection() {
  const t = useTranslations("users.UsersFilteredEmptySection");
  const { isFilteringPending } = usePageTransition();

  if (isFilteringPending) {
    return (
      <List data-test="users-list">
        <Repeat items={10} renderItem={() => <UserListItemSkeleton />} />
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
