import {
  PageSection,
  PageSectionHeader,
  PageSectionContent,
} from "@/site/common/PageSection";

import { IntroBadge } from "./IntroBadge";
import { ActionState } from "@/lib/actions/types";
import { IntroDecorative } from "./IntroDecorative";
import { CtaActions } from "@/site/home/CtaActions";
import { PageContainer } from "@/site/common/PageContainer";
import { IntroSectionHeading } from "./IntroSectionHeading";
import { IntroSectionDescription } from "./IntroSectionDescription";

interface IntroSectionProps {
  signInAsDemoUser: () => Promise<ActionState>;
}

export function IntroSection({ signInAsDemoUser }: IntroSectionProps) {
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
          <CtaActions signInAsDemoUser={signInAsDemoUser} />
        </PageSectionContent>
      </PageContainer>
    </PageSection>
  );
}
