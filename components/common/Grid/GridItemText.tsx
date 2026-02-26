// These components are direct children of a flex container and become blockified flex items.

import { twMerge } from "tailwind-merge";

const styles =
  "max-w-full truncate text-xs font-medium text-gray-500 dark:text-gray-400";

interface GridItemTextProps {
  className?: string;
  children: React.ReactNode;
}

export function GridItemText({ className, children }: GridItemTextProps) {
  return <div className={twMerge(styles, className)}>{children}</div>;
}
