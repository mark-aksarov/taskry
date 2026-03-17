"use client";

import {
  CustomerGridLargeSkeleton,
  CustomerGridMobileSkeleton,
} from "../CustomerGrid";

import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";

import { useTranslations } from "next-intl";
import { CustomerListSkeleton } from "../CustomerList";
import { useViewMode } from "@/components/common/ViewMode";
import { AbsoluteCenter } from "@/components/common/AbsoluteCenter";
import { FiltersResetButton } from "@/components/common/FiltersResetButton";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export function CustomersFilteredEmptySection() {
  const t = useTranslations("customers.CustomersFilteredEmptySection");
  const { isFilteringPending } = usePageTransition();
  const { viewMode } = useViewMode();

  if (isFilteringPending) {
    return (
      <>
        {viewMode === "list" ? (
          <CustomerListSkeleton className="max-md:hidden" items={10} />
        ) : (
          <CustomerGridLargeSkeleton className="max-md:hidden" items={10} />
        )}

        <CustomerGridMobileSkeleton className="md:hidden" items={10} />
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
