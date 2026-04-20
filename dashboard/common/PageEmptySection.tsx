import {
  EmptySection,
  EmptySectionHeading,
  EmptySectionDescription,
} from "./EmptySection";

import { AbsoluteCenter } from "./AbsoluteCenter";

interface PageEmptySectionProps {
  heading: string;
  description: string;
  createButton: React.ReactNode;
}

export function PageEmptySection({
  heading,
  description,
  createButton,
}: PageEmptySectionProps) {
  return (
    <AbsoluteCenter className="w-full">
      <EmptySection>
        <EmptySectionHeading>{heading}</EmptySectionHeading>
        <EmptySectionDescription className="max-w-[500px]">
          {description}
        </EmptySectionDescription>

        {createButton}
      </EmptySection>
    </AbsoluteCenter>
  );
}
