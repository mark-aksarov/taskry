import { twMerge } from "tailwind-merge";

export const titleStyles = "text-lg font-extrabold text-black dark:text-white";

interface DetailPanelTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function DetailPanelTitle({
  className,
  children,
}: DetailPanelTitleProps) {
  return <h2 className={twMerge(titleStyles, className)}>{children}</h2>;
}
