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
        color === "blue" && "bg-(--bg-info-1) text-(--text-info)",
        color === "green" && "bg-(--bg-success-1) text-(--text-success)",
        color === "orange" && "bg-(--bg-warning-1) text-(--text-warning)",
        color === "red" && "bg-(--bg-danger-2) text-(--text-danger)",
        color === "gray" && "bg-(--surface-3) text-(--text-tertiary)",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
