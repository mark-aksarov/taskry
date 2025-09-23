import { twMerge } from "tailwind-merge";

export type BadgeColor = "blue" | "green" | "red" | "orange";

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
        className,
        "rounded-lg px-5 py-1.5 text-center text-xs font-medium text-white",
        color === "blue" && "bg-blue-600 dark:bg-blue-700",
        color === "green" && "bg-green-700 dark:bg-green-800",
        color === "red" && "bg-red-600 dark:bg-red-700",
        color === "orange" && "bg-orange-700 dark:bg-orange-800",
      )}
      {...props}
    >
      {children}
    </span>
  );
};
