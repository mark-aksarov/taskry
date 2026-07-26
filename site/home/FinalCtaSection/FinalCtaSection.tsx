import {
  PageSection,
  PageSectionHeader,
  PageSectionContent,
  PageSectionHeading,
  PageSectionDescription,
} from "@/site/common/PageSection";

import { useTranslations } from "next-intl";
import { CtaActions } from "../../common/CtaActions";
import { PageContainer } from "@/site/common/PageContainer";

export function FinalCtaSection() {
  const t = useTranslations("site.home.FinalCtaSection");

  return (
    <PageSection className="bg-(--surface-quanteriary)">
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
          <CtaActions />
        </PageSectionContent>
      </PageContainer>
    </PageSection>
  );
}
