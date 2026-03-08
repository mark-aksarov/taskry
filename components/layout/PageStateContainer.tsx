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
  emptySectionClassName?: string;
}

export function PageStateContainer({
  heading,
  description,
  headerOffset,
  button,
  emptySectionClassName,
}: PageStateContainerProps) {
  return (
    <PageContainer fullscreen centered headerOffset={headerOffset}>
      <EmptySection className={emptySectionClassName}>
        <EmptySectionHeading>{heading}</EmptySectionHeading>
        <EmptySectionDescription>{description}</EmptySectionDescription>
        {button}
      </EmptySection>
    </PageContainer>
  );
}
