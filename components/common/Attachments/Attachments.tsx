import { twMerge } from "tailwind-merge";

export function Attachments({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={twMerge("flex w-full gap-3 overflow-x-auto", className)}>
      {children}
    </div>
  );
}
