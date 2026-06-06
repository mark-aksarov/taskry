import {
  PageSection,
  PageSectionHeader,
  PageSectionContent,
  PageSectionHeading,
  PageSectionDescription,
} from "@/site/common/PageSection";

import { useTranslations } from "next-intl";
import { RoadmapGrid } from "@/site/home/RoadmapGrid";
import { PageContainer } from "@/site/common/PageContainer";

export function RoadmapSection() {
  const t = useTranslations("site.home.RoadmapSection");

  return (
    <PageSection className="bg-(--surface-quanteriary)">
      <PageContainer>
        <PageSectionContent>
          <PageSectionHeader>
            <PageSectionHeading>{t("heading")}</PageSectionHeading>
            <PageSectionDescription>
              {t("description.line1")} <br className="max-sm:hidden" />
              {t("description.line2")}
            </PageSectionDescription>
          </PageSectionHeader>
          <RoadmapGrid />
        </PageSectionContent>
      </PageContainer>
    </PageSection>
  );
}
