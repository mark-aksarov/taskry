import { twMerge } from "tailwind-merge";

export const titleStyles = "text-xl font-extrabold text-black dark:text-white";

interface EntitySummaryTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function EntitySummaryTitle({
  className,
  children,
}: EntitySummaryTitleProps) {
  return <h2 className={twMerge(titleStyles, className)}>{children}</h2>;
}
