import { twMerge } from "tailwind-merge";

export const titleStyles =
  "text-lg font-extrabold text-black dark:text-white text-center";

interface DetailHeaderTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function DetailHeaderTitle({
  className,
  children,
}: DetailHeaderTitleProps) {
  return <h2 className={twMerge(titleStyles, className)}>{children}</h2>;
}
