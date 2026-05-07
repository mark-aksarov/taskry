import { twMerge } from "tailwind-merge";

interface PageSectionHeadingProps {
  className?: string;
  children: React.ReactNode;
}

export function PageSectionHeading({
  className,
  children,
}: PageSectionHeadingProps) {
  return (
    <h2
      className={twMerge(
        "mb-4 font-extrabold text-(--text-primary) max-md:text-3xl max-sm:text-start md:text-4xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}
