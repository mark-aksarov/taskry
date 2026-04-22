import {
  PageSection,
  PageSectionHeader,
  PageSectionContent,
  PageSectionHeading,
  PageSectionDescription,
} from "@/site/common/PageSection";

import { useTranslations } from "next-intl";
import { CtaCard } from "@/site/blocks/CtaCard";
import { CtaActions } from "@/site/blocks/CtaActions";
import { PageContainer } from "@/site/common/PageContainer";

export function FinalCtaSection() {
  const t = useTranslations("site.sections.FinalCtaSection");

  return (
    <PageSection className="pb-30 max-md:pb-16">
      <PageContainer>
        <PageSectionContent>
          <CtaCard>
            <PageSectionHeader>
              <PageSectionHeading>
                {t("heading.line1")} <br className="max-sm:hidden" />
                {t("heading.line2")}
              </PageSectionHeading>
              <PageSectionDescription>
                {t("description.line1")} <br className="max-sm:hidden" />
                {t("description.line2")}
              </PageSectionDescription>
            </PageSectionHeader>
            <CtaActions />
          </CtaCard>
        </PageSectionContent>
      </PageContainer>
    </PageSection>
  );
}
