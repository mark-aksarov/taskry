import {
  PageSection,
  PageSectionHeader,
  PageSectionContent,
  PageSectionHeading,
  PageSectionDescription,
} from "@/site/common/PageSection";

import { CtaSection } from "../CtaSection";
import { useTranslations } from "next-intl";
import { ActionState } from "@/lib/actions/types";
import { PageContainer } from "@/site/common/PageContainer";

interface FinalCtaSectionProps {
  signOut: () => Promise<ActionState>;
}

export function FinalCtaSection({ signOut }: FinalCtaSectionProps) {
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
          <CtaSection signOut={signOut} />
        </PageSectionContent>
      </PageContainer>
    </PageSection>
  );
}
