import { twMerge } from "tailwind-merge";

interface AuthCardSubtitleProps {
  className?: string;
  children: React.ReactNode;
}

export function AuthCardSubtitle({
  className,
  children,
}: AuthCardSubtitleProps) {
  return (
    <p
      className={twMerge(
        "text-center text-sm text-gray-500 dark:text-gray-400",
        className,
      )}
    >
      {children}
    </p>
  );
}
