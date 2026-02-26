import { twMerge } from "tailwind-merge";
import { Link } from "@/components/ui/Link";
import { Skeleton } from "@/components/ui/Skeleton";

// Truncate (overflow-hidden + text-overflow) works only on block elements.
// See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow#formal_definition

// Components are direct children of a flex container and become blockified flex items.
// See: https://www.w3.org/TR/css-flexbox-1/#flex-items

const styles =
  "max-w-full truncate text-xs font-medium text-gray-500 dark:text-gray-400";

// Text only
interface ListItemTextProps {
  className?: string;
  children: React.ReactNode;
}

export function ListItemText({ className, children }: ListItemTextProps) {
  return <span className={twMerge(styles, className)}>{children}</span>;
}

// Link
export function ListItemTextLink({
  href,
  className,
  children,
}: ListItemTextLinkProps) {
  // Link uses display: inline-flex by default.
  // To make text truncation work, set display: inline-block.
  return (
    <Link className={twMerge(styles, "inline-block", className)} href={href}>
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
