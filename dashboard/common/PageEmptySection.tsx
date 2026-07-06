import {
  FallbackSection,
  FallbackSectionHeading,
  FallbackSectionDescription,
} from "../../common/FallbackSection";

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
      <FallbackSection>
        <FallbackSectionHeading>{heading}</FallbackSectionHeading>
        <FallbackSectionDescription className="max-w-[500px]">
          {description}
        </FallbackSectionDescription>

        {createButton}
      </FallbackSection>
    </AbsoluteCenter>
  );
}
