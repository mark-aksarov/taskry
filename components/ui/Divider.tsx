import { twMerge } from "tailwind-merge";

export const Divider = ({ className }: { className?: string }) => {
  return (
    <div className={twMerge("h-px bg-gray-300 dark:bg-gray-600", className)} />
  );
};
