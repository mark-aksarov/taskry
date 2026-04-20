import { twMerge } from "tailwind-merge";

interface EmptySectionDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export function EmptySectionDescription({
  className,
  children,
}: EmptySectionDescriptionProps) {
  return (
    <p
      className={twMerge(
        "text-center text-sm text-gray-600 dark:text-gray-400",
        className,
      )}
    >
      {children}
    </p>
  );
}
