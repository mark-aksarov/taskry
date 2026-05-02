import { twMerge } from "tailwind-merge";

interface PageSectionDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export function PageSectionDescription({
  className,
  children,
}: PageSectionDescriptionProps) {
  return (
    <p
      className={twMerge(
        "mx-auto font-normal text-gray-600 max-md:text-base/7 max-sm:text-start md:text-lg/8 dark:text-gray-300",
        className,
      )}
    >
      {children}
    </p>
  );
}
