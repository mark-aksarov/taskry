import { twMerge } from "tailwind-merge";

interface FallbackSectionDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export function FallbackSectionDescription({
  className,
  children,
}: FallbackSectionDescriptionProps) {
  return (
    <p
      className={twMerge(
        "text-center text-sm text-(--text-tertiary)",
        className,
      )}
    >
      {children}
    </p>
  );
}
