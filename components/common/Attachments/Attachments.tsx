import { twMerge } from "tailwind-merge";

export function Attachments({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={twMerge("flex w-full flex-wrap gap-3", className)}>
      {children}
    </div>
  );
}
