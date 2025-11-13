import { twMerge } from "tailwind-merge";

export const titleStyles =
  "max-w-full truncate p-1 -m-1 text-sm font-bold text-black dark:text-white inline";

interface GridItemTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function GridItemTitle({ className, children }: GridItemTitleProps) {
  return <h3 className={twMerge(titleStyles, className)}>{children}</h3>;
}
