"use client";

import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";

import { useTranslations } from "next-intl";
import { PageContainer } from "@/components/common/PageContainer";

export default function ErrorPageLayout() {
  const t = useTranslations("app.DashboardErrorPage");

  return (
    <PageContainer fullscreen centered>
      <EmptySection className="max-w-[500px]">
        <EmptySectionHeading>{t("heading")}</EmptySectionHeading>
        <EmptySectionDescription>{t("description")}</EmptySectionDescription>
      </EmptySection>
    </PageContainer>
  );
}
