import { twMerge } from "tailwind-merge";

export type BadgeColor = "blue" | "green";

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
        "rounded-full px-5 py-1.5 text-center text-xs font-bold",
        color === "blue" &&
          "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300",
        color === "green" &&
          "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
