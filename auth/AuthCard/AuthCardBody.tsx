import { twMerge } from "tailwind-merge";

interface AuthCardBodyProps {
  className?: string;
  children: React.ReactNode;
}

export function AuthCardBody({ className, children }: AuthCardBodyProps) {
  return (
    <div className={twMerge("flex flex-col gap-6", className)}>{children}</div>
  );
}
