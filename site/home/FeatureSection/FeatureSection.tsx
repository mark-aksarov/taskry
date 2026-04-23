import {
  PageSection,
  PageSectionHeader,
  PageSectionContent,
  PageSectionHeading,
  PageSectionDescription,
} from "@/site/common/PageSection";

import { useTranslations } from "next-intl";
import { FeatureGrid } from "@/site/home/FeatureGrid";
import { PageContainer } from "@/site/common/PageContainer";

export function FeatureSection() {
  const t = useTranslations("site.sections.FeaturesSection");

  return (
    <PageSection>
      <PageContainer>
        <PageSectionContent>
          <PageSectionHeader>
            <PageSectionHeading>{t("heading")}</PageSectionHeading>
            <PageSectionDescription>
              {t("description.line1")} <br className="max-sm:hidden" />
              {t("description.line2")}
            </PageSectionDescription>
          </PageSectionHeader>
          <FeatureGrid />
        </PageSectionContent>
      </PageContainer>
    </PageSection>
  );
}
