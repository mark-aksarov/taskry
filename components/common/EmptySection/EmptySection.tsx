import { twMerge } from "tailwind-merge";

interface EmptySectionProps {
  className?: string;
  children?: React.ReactNode;
}

export function EmptySection({ className, children }: EmptySectionProps) {
  return (
    <section className={twMerge("flex flex-col items-center gap-4", className)}>
      {children}
    </section>
  );
}
