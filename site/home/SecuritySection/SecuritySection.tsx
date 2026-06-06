import {
  PageSection,
  PageSectionHeader,
  PageSectionContent,
  PageSectionHeading,
  PageSectionDescription,
} from "@/site/common/PageSection";

import { useTranslations } from "next-intl";
import { SecurityGrid } from "../SecurityGrid";
import { PageContainer } from "@/site/common/PageContainer";

export function SecuritySection() {
  const t = useTranslations("site.home.SecuritySection");

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
          <SecurityGrid />
        </PageSectionContent>
      </PageContainer>
    </PageSection>
  );
}
