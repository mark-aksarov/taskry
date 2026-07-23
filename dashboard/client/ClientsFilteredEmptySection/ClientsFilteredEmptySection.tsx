"use client";

import {
  FallbackSection,
  FallbackSectionHeading,
  FallbackSectionDescription,
} from "@/common/FallbackSection";

import { useTranslations } from "next-intl";
import { ClientGridSkeleton } from "../ClientGrid";
import { useViewMode } from "@/dashboard/common/ViewMode";
import { AbsoluteCenter } from "@/dashboard/common/AbsoluteCenter";
import { FiltersResetButton } from "@/dashboard/common/FiltersResetButton";
import { usePageTransition } from "@/dashboard/common/PageTransitionContext";

export function ClientsFilteredEmptySection() {
  const t = useTranslations(
    "dashboard.clients.ClientsFilteredEmptySection",
  );
  const { isFilteringPending } = usePageTransition();
  const { viewMode } = useViewMode();

  if (isFilteringPending) {
    return <ClientGridSkeleton viewMode={viewMode} />;
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
