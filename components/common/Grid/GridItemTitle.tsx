import { twMerge } from "tailwind-merge";
import {
  ItemBaseDetailModalTrigger,
  ItemBaseDetailModalTriggerProps,
} from "../ItemBase";

// These components are direct children of a flex container and become blockified flex items.

export const titleStyles =
  "truncate max-w-full text-sm font-bold text-black dark:text-white";

// Text only title
interface GridItemTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function GridItemTitle({ className, children }: GridItemTitleProps) {
  return <div className={twMerge(titleStyles, className)}>{children}</div>;
}

// Detail modal title
export function GridItemTitleDetailModalTrigger({
  className,
  children,
  ...props
}: ItemBaseDetailModalTriggerProps & GridItemTitleProps) {
  return (
    <ItemBaseDetailModalTrigger
      className={twMerge(titleStyles, className)}
      {...props}
    >
      {children}
    </ItemBaseDetailModalTrigger>
  );
}
