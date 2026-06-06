import {
  PageSection,
  PageSectionHeader,
  PageSectionContent,
  PageSectionHeading,
  PageSectionDescription,
} from "@/site/common/PageSection";

import { useTranslations } from "next-intl";
import { AdvantagesGrid } from "../AdvantagesGrid";
import { PageContainer } from "@/site/common/PageContainer";

export function AdvantagesSection() {
  const t = useTranslations("site.home.AdvantagesSection");

  return (
    <PageSection>
      <PageContainer>
        <PageSectionContent className="items-center">
          <PageSectionHeader>
            <PageSectionHeading>{t("heading")}</PageSectionHeading>
            <PageSectionDescription>
              {t("description.line1")} <br className="max-sm:hidden" />
              {t("description.line2")}
            </PageSectionDescription>
          </PageSectionHeader>
          <AdvantagesGrid />
        </PageSectionContent>
      </PageContainer>
    </PageSection>
  );
}
