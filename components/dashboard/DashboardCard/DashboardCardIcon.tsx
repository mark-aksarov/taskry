import { twMerge } from "tailwind-merge";

export type DashboardCardIconColor = "blue" | "orange" | "green";

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
        "rounded-xl p-3",
        color === "blue" &&
          "bg-blue-100 text-blue-500 dark:bg-blue-700 dark:text-blue-100",
        color === "orange" &&
          "bg-orange-100 text-orange-400 dark:bg-orange-600 dark:text-orange-100",
        color === "green" &&
          "bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-100",
      )}
    >
      {children}
    </div>
  );
};
