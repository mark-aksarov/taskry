import { twMerge } from "tailwind-merge";

interface ErrorBannerTextProps {
  className?: string;
  children: React.ReactNode;
}

export function ErrorBanner({ className, children }: ErrorBannerTextProps) {
  return (
    <div
      className={twMerge(
        "items-center bg-red-100 p-3 text-xs font-bold text-red-700 dark:bg-red-900 dark:text-red-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
