import { twMerge } from "tailwind-merge";

interface AbsoluteCenterProps {
  className?: string;
  children: React.ReactNode;
}

export function AbsoluteCenter({ className, children }: AbsoluteCenterProps) {
  return (
    <div
      className={twMerge(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        className,
      )}
    >
      {children}
    </div>
  );
}
