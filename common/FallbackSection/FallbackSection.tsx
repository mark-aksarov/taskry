import { twMerge } from "tailwind-merge";

interface FallbackSectionProps {
  className?: string;
  children?: React.ReactNode;
}

export function FallbackSection({ className, children }: FallbackSectionProps) {
  return (
    <section className={twMerge("flex flex-col items-center gap-4", className)}>
      {children}
    </section>
  );
}
