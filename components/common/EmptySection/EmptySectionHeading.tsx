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
        "text-center font-extrabold text-black max-md:text-4xl md:text-5xl dark:text-white",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
