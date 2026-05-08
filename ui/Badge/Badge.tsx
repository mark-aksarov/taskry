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
        color === "blue" && "bg-(--surface-info) text-(--text-info)",
        color === "green" && "bg-(--surface-success) text-(--text-success)",
        color === "orange" && "bg-(--surface-warning) text-(--text-warning)",
        color === "red" && "bg-(--surface-danger) text-(--text-danger)",
        color === "gray" &&
          "bg-gray-100 text-(--text-tertiary) dark:bg-gray-700",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
