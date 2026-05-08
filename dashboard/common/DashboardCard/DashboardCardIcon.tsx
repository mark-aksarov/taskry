import { twMerge } from "tailwind-merge";

export type DashboardCardIconColor = "blue" | "red" | "orange" | "green";

interface DashboardCardIconProps {
  color?: DashboardCardIconColor;
  children: React.ReactNode;
}

export const DashboardCardIcon = ({
  color = "blue",
  children,
}: DashboardCardIconProps) => {
  return (
    <div
      className={twMerge(
        "rounded-full p-4.5",
        color === "blue" && "bg-(--surface-info) text-(--icon-info)",
        color === "orange" && "bg-(--surface-warning) text-(--icon-warning)",
        color === "red" && "bg-(--surface-danger) text-(--icon-danger)",
        color === "green" && "bg-(--surface-success) text-(--icon-success)",
      )}
    >
      {children}
    </div>
  );
};
