import { twMerge } from "tailwind-merge";
import { UserIcon } from "../icons/UserIcon";
import { ImageContainer } from "./ImageContainer";

interface UnknownUserProps {
  className?: string;
  iconSize?: number;
}

export function UnknownUser({ className, iconSize = 20 }: UnknownUserProps) {
  return (
    <ImageContainer
      className={twMerge(
        "flex items-center justify-center text-gray-400 dark:text-gray-500",
        className,
      )}
    >
      <UserIcon size={iconSize} />
    </ImageContainer>
  );
}
