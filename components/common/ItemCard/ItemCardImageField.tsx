import { twMerge } from "tailwind-merge";

const filedStyles =
  "h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative";

interface ItemCardImageFieldProps {
  className?: string;
  children?: React.ReactNode;
}

export function ItemCardImageField({
  className,
  children,
}: ItemCardImageFieldProps) {
  return <div className={twMerge(filedStyles, className)}>{children}</div>;
}

export function ItemCardImageFieldSkeleton({
  className,
}: {
  className?: string;
}) {
  return <div className={twMerge(filedStyles, className)} />;
}
