import { twMerge } from "tailwind-merge";

export const BaseItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "@container flex w-full items-center border-gray-300 bg-white py-3 not-last:border-b-1 dark:border-gray-600 dark:bg-gray-800",
        className,
      )}
    >
      {children}
    </div>
  );
};
