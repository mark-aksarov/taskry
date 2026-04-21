import {
  PageSection,
  PageSectionHeader,
  PageSectionContent,
  PageSectionHeading,
  PageSectionDescription,
} from "@/site/common/PageSection";

import { useTranslations } from "next-intl";
import { DocsGrid } from "@/site/blocks/DocsGrid";
import { CtaActions } from "@/site/blocks/CtaActions";
import { PageContainer } from "@/site/common/PageContainer";

export function FinalCtaSection() {
  const t = useTranslations("site.sections.FinalCtaSection");

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
          <CtaActions />
        </PageSectionContent>
      </PageContainer>
    </PageSection>
  );
}
