import {
  PageSection,
  PageSectionHeader,
  PageSectionContent,
} from "@/site/common/PageSection";

import { IntroBadge } from "./IntroBadge";
import { IntroDecorative } from "./IntroDecorative";
import { PageContainer } from "@/site/common/PageContainer";
import { IntroSectionHeading } from "./IntroSectionHeading";
import { IntroSectionDescription } from "./IntroSectionDescription";

interface IntroSectionProps {
  ctaActionsContainer: React.ReactNode;
}

export function IntroSection({ ctaActionsContainer }: IntroSectionProps) {
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
          {ctaActionsContainer}
        </PageSectionContent>
      </PageContainer>
    </PageSection>
  );
}
