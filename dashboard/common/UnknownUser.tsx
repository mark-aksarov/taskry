import { UserIcon } from "@/icons/UserIcon";
import { IconContainer } from "./IconContainer";

interface UnknownUserProps {
  className?: string;
  iconSize?: number;
}

export function UnknownUser({ className, iconSize = 20 }: UnknownUserProps) {
  return (
    <IconContainer className={className}>
      <UserIcon size={iconSize} />
    </IconContainer>
  );
}
