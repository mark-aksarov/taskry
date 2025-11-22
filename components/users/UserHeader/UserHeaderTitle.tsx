import { twMerge } from "tailwind-merge";

export const titleStyles = "text-lg font-extrabold text-black dark:text-white";

interface UserHeaderTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function UserHeaderTitle({ className, children }: UserHeaderTitleProps) {
  return <h2 className={twMerge(titleStyles, className)}>{children}</h2>;
}
