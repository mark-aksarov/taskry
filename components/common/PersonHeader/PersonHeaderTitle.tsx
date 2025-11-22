import { twMerge } from "tailwind-merge";

export const titleStyles = "text-lg font-extrabold text-black dark:text-white";

interface PersonHeaderTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function PersonHeaderTitle({
  className,
  children,
}: PersonHeaderTitleProps) {
  return <h2 className={twMerge(titleStyles, className)}>{children}</h2>;
}
