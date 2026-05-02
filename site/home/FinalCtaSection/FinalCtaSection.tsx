import {
  PageSection,
  PageSectionHeader,
  PageSectionContent,
  PageSectionHeading,
  PageSectionDescription,
} from "@/site/common/PageSection";

import { useTranslations } from "next-intl";
import { PageContainer } from "@/site/common/PageContainer";

interface FinalCtaSectionProps {
  ctaActionsContainer: React.ReactNode;
}

export function FinalCtaSection({ ctaActionsContainer }: FinalCtaSectionProps) {
  const t = useTranslations("site.sections.FinalCtaSection");

  return (
    <PageSection className="pb-30 max-md:pb-16">
      <PageContainer>
        <PageSectionContent>
          <PageSectionHeader>
            <PageSectionHeading className="max-md:text-3xl md:mb-6 md:text-5xl">
              {t("heading.line1")} <br className="max-sm:hidden" />
              {t("heading.line2")}
            </PageSectionHeading>
            <PageSectionDescription>
              {t("description.line1")} <br className="max-sm:hidden" />
              {t("description.line2")}
            </PageSectionDescription>
          </PageSectionHeader>
          {ctaActionsContainer}
        </PageSectionContent>
      </PageContainer>
    </PageSection>
  );
}
