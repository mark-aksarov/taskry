import { twMerge } from "tailwind-merge";

export type BadgeColor = "blue" | "green" | "gray" | "orange" | "red";

export interface BadgeProps extends React.ComponentPropsWithRef<"div"> {
  color?: BadgeColor;
}

export const Badge = ({
  color = "blue",
  children,
  className,
  ...props
}: BadgeProps) => {
  return (
    <div
      role="presentation"
      className={twMerge(
        "flex items-center justify-center gap-1 rounded-full px-5 py-1.5 text-center text-xs font-bold",
        color === "blue" &&
          "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300",
        color === "green" &&
          "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300",
        color === "orange" &&
          "bg-orange-100 text-orange-700 dark:bg-orange-700 dark:text-orange-100",
        color === "red" &&
          "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100",
        color === "gray" &&
          "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
