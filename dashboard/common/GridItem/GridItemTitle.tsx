import { twMerge } from "tailwind-merge";
import { ItemBaseDetailButton, ItemBaseDetailButtonProps } from "../ItemBase";

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

// Detail button
export function GridItemTitleButton({
  className,
  children,
  ...props
}: ItemBaseDetailButtonProps & GridItemTitleProps) {
  return (
    <ItemBaseDetailButton
      className={twMerge(titleStyles, className)}
      {...props}
    >
      {children}
    </ItemBaseDetailButton>
  );
}
