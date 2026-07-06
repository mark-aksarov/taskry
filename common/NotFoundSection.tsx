import {
  FallbackSection,
  FallbackSectionHeading,
  FallbackSectionDescription,
} from "@/common/FallbackSection";
import { ButtonLink } from "@/ui/Button";

interface NotFoundSectionProps {
  linkLabel?: string;
  linkHref?: string;
  heading: string;
  description: string;
}

export default function NotFoundSection({
  linkLabel,
  linkHref,
  heading,
  description,
}: NotFoundSectionProps) {
  return (
    <FallbackSection>
      <FallbackSectionHeading>{heading}</FallbackSectionHeading>
      <FallbackSectionDescription className="max-w-[500px]">
        {description}
      </FallbackSectionDescription>
      <ButtonLink
        size="medium"
        href={linkHref}
        variant="secondary"
        outlined
        label={linkLabel}
      />
    </FallbackSection>
  );
}
