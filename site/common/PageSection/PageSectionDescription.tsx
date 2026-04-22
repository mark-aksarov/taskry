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
        "mx-auto font-normal text-slate-600 max-md:text-base/7 md:text-lg/8 dark:text-slate-300",
        className,
      )}
    >
      {children}
    </p>
  );
}
