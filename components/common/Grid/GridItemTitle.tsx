import { twMerge } from "tailwind-merge";
import {
  ItemBaseDetailModalTrigger,
  ItemBaseDetailModalTriggerProps,
} from "../ItemBase";

export const titleStyles =
  "truncate max-w-full md:text-sm max-md:text-base font-bold text-black dark:text-white";

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
