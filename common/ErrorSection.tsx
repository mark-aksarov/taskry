"use client";

import {
  FallbackSection,
  FallbackSectionHeading,
  FallbackSectionDescription,
} from "@/common/FallbackSection";

import { Button } from "@/ui/Button";

interface ErrorSectionProps {
  heading: string;
  description: string;
  resetButtonLabel: string;
  reset: () => void;
}

export default function ErrorSection({
  heading,
  description,
  resetButtonLabel,
  reset,
}: ErrorSectionProps) {
  return (
    <FallbackSection>
      <FallbackSectionHeading>{heading}</FallbackSectionHeading>
      <FallbackSectionDescription className="max-w-[500px]">
        {description}
      </FallbackSectionDescription>
      <Button
        variant="secondary"
        outlined
        label={resetButtonLabel}
        size="medium"
        onPress={reset}
      />
    </FallbackSection>
  );
}
