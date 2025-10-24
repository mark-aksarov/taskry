import { twMerge } from "tailwind-merge";

export type BadgeColor = "blue" | "green" | "gray";

export interface BadgeProps extends React.ComponentPropsWithRef<"span"> {
  color?: BadgeColor;
}

export const Badge = ({
  color = "blue",
  children,
  className,
  ...props
}: BadgeProps) => {
  return (
    <span
      role="presentation"
      className={twMerge(
        "inline-flex items-center justify-center gap-1 rounded-full px-5 py-1.5 text-center text-xs font-bold",
        color === "blue" &&
          "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300",
        color === "green" &&
          "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300",
        color === "gray" &&
          "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
