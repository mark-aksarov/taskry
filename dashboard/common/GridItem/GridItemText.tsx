import { twMerge } from "tailwind-merge";

const styles =
  "max-w-full truncate text-xs font-medium text-(--text-secondary)";

interface GridItemTextProps {
  className?: string;
  children: React.ReactNode;
}

export function GridItemText({ className, children }: GridItemTextProps) {
  return <div className={twMerge(styles, className)}>{children}</div>;
}
