import { twMerge } from "tailwind-merge";
import { ImageContainer } from "./ImageContainer";

interface IconContainerProps {
  className?: string;
  children: React.ReactNode;
}

export function IconContainer({ className, children }: IconContainerProps) {
  return (
    <ImageContainer
      className={twMerge(
        "flex items-center justify-center text-gray-400 dark:text-gray-500",
        className,
      )}
    >
      {children}
    </ImageContainer>
  );
}
