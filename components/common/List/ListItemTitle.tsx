import { twMerge } from "tailwind-merge";
import { Link } from "@/components/ui/Link";
import { Skeleton } from "@/components/ui/Skeleton";
import { ItemBaseDetailModalTrigger } from "../ItemBase";
import { ItemBaseDetailModalTriggerProps } from "../ItemBase";

// Truncate (overflow-hidden + text-overflow) works only on block elements.
// See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow#formal_definition

export const titleStyles =
  "truncate max-w-full text-sm font-bold text-black dark:text-white";

// Text only title
interface ListItemTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function ListItemTitle({ className, children }: ListItemTitleProps) {
  return <div className={twMerge(titleStyles, className)}>{children}</div>;
}

// Link title
interface ListItemTitleLinkProps extends ListItemTitleProps {
  href: string;
}

export function ListItemTitleLink({
  href,
  className,
  children,
}: ListItemTitleLinkProps) {
  // Link uses display: inline-flex by default.
  // To make text truncation work, set display: inline-block.
  return (
    <Link
      className={twMerge(titleStyles, "inline-block", className)}
      href={href}
    >
      {children}
    </Link>
  );
}

// Detail modal title
export function ListItemTitleDetailModalTrigger({
  className,
  children,
  ...props
}: ItemBaseDetailModalTriggerProps & ListItemTitleProps) {
  return (
    <ItemBaseDetailModalTrigger
      className={twMerge(titleStyles, className)}
      {...props}
    >
      {children}
    </ItemBaseDetailModalTrigger>
  );
}

// Skeleton
export function ListItemTitleSkeleton() {
  return <Skeleton className="w-[6rem] max-w-full" size="sm" />;
}
