import { Mail } from "lucide-react";
import { GridItemContactLink } from "./GridItemContact";
import { GridItemContactText } from "./GridItemContactText";
import { GridItemContactIconWrapper } from "./GridItemContactIconWrapper";

interface GridItemEmailProps {
  email: string;
}

export function GridItemEmail({ email }: GridItemEmailProps) {
  return (
    <GridItemContactLink href={`mailto:${email}`}>
      <GridItemContactIconWrapper>
        <Mail size={16} strokeWidth={1.5} absoluteStrokeWidth />
      </GridItemContactIconWrapper>
      <GridItemContactText>{email}</GridItemContactText>
    </GridItemContactLink>
  );
}
