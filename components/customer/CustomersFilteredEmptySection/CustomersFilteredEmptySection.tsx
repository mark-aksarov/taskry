"use client";

import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";

import { useTranslations } from "next-intl";
import { List } from "@/components/common/List";
import { Repeat } from "@/components/common/Repeat";
import { CustomerListItemSkeleton } from "../CustomerListItem";
import { AbsoluteCenter } from "@/components/common/AbsoluteCenter";
import { FiltersResetButton } from "@/components/common/FiltersResetButton";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export function CustomersFilteredEmptySection() {
  const t = useTranslations("customers.CustomersFilteredEmptySection");
  const { isFilteringPending } = usePageTransition();

  if (isFilteringPending) {
    return (
      <List data-test="customers-list">
        <Repeat items={10} renderItem={() => <CustomerListItemSkeleton />} />
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
