"use client";

import { twMerge } from "tailwind-merge";

interface ErrorBannerTextProps {
  ref?: React.RefObject<HTMLDivElement | null>;
  className?: string;
  children: React.ReactNode;
}

export function ErrorBanner({
  ref,
  className,
  children,
}: ErrorBannerTextProps) {
  return (
    <div
      ref={ref}
      role="alert"
      aria-live="assertive"
      className={twMerge(
        "items-center bg-(--bg-danger-1) p-3 text-xs font-bold text-(--text-danger)",
        className,
      )}
    >
      {children}
    </div>
  );
}
