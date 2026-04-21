import { twMerge } from "tailwind-merge";

interface PageContainerProps {
  className?: string;
  children: React.ReactNode;
}

export function PageContainer({ className, children }: PageContainerProps) {
  return (
    <div
      className={twMerge(
        "mx-auto w-full max-w-[1200px] max-md:px-4 md:px-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
