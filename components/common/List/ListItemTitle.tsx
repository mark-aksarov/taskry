import { twMerge } from "tailwind-merge";

export const titleStyles =
  "overflow-hidden max-w-full p-1 -m-1 text-nowrap overflow-ellipsis text-sm font-bold text-black dark:text-white inline";

interface ListItemTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function ListItemTitle({ className, children }: ListItemTitleProps) {
  return <h3 className={twMerge(titleStyles, className)}>{children}</h3>;
}
