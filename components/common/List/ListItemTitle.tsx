import { twMerge } from "tailwind-merge";

export const titleStyles =
  "truncate max-w-full p-1 -m-1 text-sm font-bold text-black dark:text-white";

interface ListItemTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function ListItemTitle({ className, children }: ListItemTitleProps) {
  return <h3 className={twMerge(titleStyles, className)}>{children}</h3>;
}
