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
        "mb-4 font-extrabold text-black max-md:text-3xl md:text-4xl dark:text-white",
        className,
      )}
    >
      {children}
    </h2>
  );
}
