import { twMerge } from "tailwind-merge";

interface EmptySectionHeadingProps {
  tag?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}

export function EmptySectionHeading({
  tag: Tag = "h2",
  className,
  children,
}: EmptySectionHeadingProps) {
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
