import { twMerge } from "tailwind-merge";

export type ConfirmModalTextProps = {
  className?: string;
  children: React.ReactNode;
};

export function ConfirmModalText({
  className,
  children,
}: ConfirmModalTextProps) {
  return (
    <p className={twMerge("mt-3 text-sm text-(--text-primary)", className)}>
      {children}
    </p>
  );
}
