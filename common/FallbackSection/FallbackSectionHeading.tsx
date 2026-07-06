import { twMerge } from "tailwind-merge";

interface FallbackSectionHeadingProps {
  tag?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

export function FallbackSectionHeading({
  tag: Tag = "h2",
  className,
  children,
}: FallbackSectionHeadingProps) {
  return (
    <Tag
      className={twMerge(
        "text-center font-extrabold text-(--text-primary) max-md:text-3xl md:text-4xl",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
