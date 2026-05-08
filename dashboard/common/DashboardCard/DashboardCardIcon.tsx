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
        color === "blue" &&
          "bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300",
        color === "orange" &&
          "bg-orange-100 text-orange-400 dark:bg-orange-700 dark:text-orange-200",
        color === "red" &&
          "bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-200",
        color === "green" &&
          "bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300",
      )}
    >
      {children}
    </div>
  );
};
