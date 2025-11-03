import { twMerge } from "tailwind-merge";

export const titleStyles = "text-lg font-extrabold text-black dark:text-white";

interface ProfileHeaderTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function ProfileHeaderTitle({
  className,
  children,
}: ProfileHeaderTitleProps) {
  return <h2 className={twMerge(titleStyles, className)}>{children}</h2>;
}
