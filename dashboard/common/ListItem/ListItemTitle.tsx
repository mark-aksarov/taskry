import { twMerge } from "tailwind-merge";
import { BaseLink } from "@/ui/Link";
import { Skeleton } from "@/ui/Skeleton";
import { ItemBaseDetailButton, ItemBaseDetailButtonProps } from "../ItemBase";

// Truncate (overflow-hidden + text-overflow) works only on block elements.
// See: https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow#formal_definition

export const titleStyles =
  "truncate max-w-full text-sm font-bold text-(--text-primary)";

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
  // Link uses display: flex by default.
  // To make text truncation work, set display: block.
  return (
    <BaseLink className={twMerge(titleStyles, "block", className)} href={href}>
      {children}
    </BaseLink>
  );
}

// Detail button
export function ListItemTitleButton({
  className,
  children,
  ...props
}: ItemBaseDetailButtonProps & ListItemTitleProps) {
  return (
    <ItemBaseDetailButton
      className={twMerge(titleStyles, className)}
      {...props}
    >
      {children}
    </ItemBaseDetailButton>
  );
}

// Skeleton
export function ListItemTitleSkeleton() {
  return <Skeleton className="w-[6rem] max-w-full" size="sm" />;
}
