import { twMerge } from "tailwind-merge";
import { Link } from "@/components/ui/Link";
import { Skeleton } from "@/components/ui/Skeleton";

const styles =
  "max-w-full truncate text-xs font-medium text-gray-500 dark:text-gray-400";

// Text only
interface ListItemTextProps {
  className?: string;
  children: React.ReactNode;
}

export function ListItemText({ className, children }: ListItemTextProps) {
  return <div className={twMerge(styles, className)}>{children}</div>;
}

// Link
export function ListItemTextLink({
  href,
  className,
  children,
}: ListItemTextLinkProps) {
  // Link uses display: flex by default.
  // To make text truncation work, set display: block.
  return (
    <Link className={twMerge(styles, "block", className)} href={href}>
      {children}
    </Link>
  );
}

// Skeleton
export function ListItemTextSkeleton() {
  return <Skeleton className="w-[4rem] max-w-full" size="xs" />;
}

interface ListItemTextLinkProps extends ListItemTextProps {
  href: string;
}
