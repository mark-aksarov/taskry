import { twMerge } from "tailwind-merge";

export const titleStyles =
  "truncate max-w-full p-1 -m-1 text-sm font-bold text-black dark:text-white";

interface ListItemTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function ListItemTitle({
  className,
  children,
  ...props
}: ListItemTitleProps) {
  return (
    <div className={twMerge(titleStyles, className)} {...props}>
      {children}
    </div>
  );
}
