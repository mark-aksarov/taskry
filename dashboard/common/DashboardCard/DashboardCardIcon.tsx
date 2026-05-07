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
        color === "blue" && "bg-(--bg-info-1) text-(--icon-info)",
        color === "orange" && "bg-(--bg-warning-1) text-(--icon-warning)",
        color === "red" && "bg-(--bg-danger-2) text-(--icon-danger)",
        color === "green" && "bg-(--bg-success-1) text-(--icon-success)",
      )}
    >
      {children}
    </div>
  );
};
