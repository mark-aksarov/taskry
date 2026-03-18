"use client";

import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";

import { useTranslations } from "next-intl";
import { UserListSkeleton } from "../UserList";
import { useViewMode } from "@/components/common/ViewMode";
import { AbsoluteCenter } from "@/components/common/AbsoluteCenter";
import { FiltersResetButton } from "@/components/common/FiltersResetButton";
import { UserGridLargeSkeleton, UserGridMobileSkeleton } from "../UserGrid";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export function UsersFilteredEmptySection() {
  const t = useTranslations("users.UsersFilteredEmptySection");
  const { isFilteringPending } = usePageTransition();
  const { viewMode } = useViewMode();

  if (isFilteringPending) {
    return (
      <>
        {viewMode === "list" ? (
          <UserListSkeleton className="max-md:hidden" items={10} />
        ) : (
          <UserGridLargeSkeleton className="max-md:hidden" items={10} />
        )}

        <UserGridMobileSkeleton className="md:hidden" items={10} />
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
