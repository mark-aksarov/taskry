import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "@/components/common/EmptySection";

import { PageContainer } from "@/components/common/PageContainer";

export interface PageStateContainerProps {
  heading: string;
  description: string;
  headerOffset?: boolean;
  button: React.ReactNode;
}

export function PageStateContainer({
  heading,
  description,
  headerOffset,
  button,
}: PageStateContainerProps) {
  return (
    <PageContainer fullscreen centered headerOffset={headerOffset}>
      <EmptySection>
        <EmptySectionHeading>{heading}</EmptySectionHeading>
        <EmptySectionDescription className="max-w-[500px]">
          {description}
        </EmptySectionDescription>
        {button}
      </EmptySection>
    </PageContainer>
  );
}
