import {
  PageSection,
  PageSectionHeader,
  PageSectionContent,
} from "@/site/common/PageSection";

import { IntroBadge } from "./IntroBadge";
import { IntroDecorative } from "./IntroDecorative";
import { CtaActions } from "@/site/home/CtaActions";
import { PageContainer } from "@/site/common/PageContainer";
import { IntroSectionHeading } from "./IntroSectionHeading";
import { IntroSectionDescription } from "./IntroSectionDescription";

export function IntroSection() {
  return (
    <PageSection className="relative max-md:pt-15 max-md:pb-8 md:pt-30 md:pb-15">
      <IntroDecorative />
      <PageContainer>
        <PageSectionContent>
          <IntroBadge />
          <PageSectionHeader>
            <IntroSectionHeading />
            <IntroSectionDescription />
          </PageSectionHeader>
          <CtaActions />
        </PageSectionContent>
      </PageContainer>
    </PageSection>
  );
}
