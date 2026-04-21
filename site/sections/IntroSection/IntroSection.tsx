import {
  PageSection,
  PageSectionHeader,
  PageSectionContent,
} from "@/site/common/PageSection";

import { CtaActions } from "@/site/blocks/CtaActions";
import { PageContainer } from "@/site/common/PageContainer";
import { IntroSectionHeading } from "./IntroSectionHeading";
import { IntroSectionDescription } from "./IntroSectionDescription";

export function IntroSection() {
  return (
    <PageSection className="max-md:py-15 md:py-32">
      <PageContainer>
        <PageSectionContent>
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
