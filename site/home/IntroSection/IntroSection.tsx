import {
  PageSection,
  PageSectionHeader,
  PageSectionContent,
} from "@/site/common/PageSection";

import { IntroBadge } from "./IntroBadge";
import { ActionState } from "@/lib/actions/types";
import { IntroBackground } from "./IntroBackground";
import { CtaActions } from "@/site/common/CtaActions";
import { PageContainer } from "@/site/common/PageContainer";
import { IntroSectionHeading } from "./IntroSectionHeading";
import { IntroSectionDescription } from "./IntroSectionDescription";

interface IntroSectionProps {
  signOut: () => Promise<ActionState>;
}

export function IntroSection({ signOut }: IntroSectionProps) {
  return (
    <PageSection className="relative max-md:pt-10 max-md:pb-8 md:pt-20 md:pb-0">
      <PageContainer>
        <PageSectionContent className="items-center">
          <IntroBadge />
          <PageSectionHeader>
            <IntroSectionHeading />
            <IntroSectionDescription />
          </PageSectionHeader>
          <CtaActions signOut={signOut} />
          <IntroBackground />
        </PageSectionContent>
      </PageContainer>
    </PageSection>
  );
}
