import { TrendingDown, TrendingUp } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface DashboardCardStatProps {
  value: number;
  prevValue: number;
}

export const DashboardCardStat = ({
  value,
  prevValue,
}: DashboardCardStatProps) => {
  const direction = value > prevValue ? "up" : "down";
  const percentage = Math.abs((value - prevValue) / prevValue) * 100;

  return (
    <div
      className={twMerge(
        "flex items-center gap-2",
        direction === "up" && "text-green-700 dark:text-green-500",
        direction === "down" && "text-red-600 dark:text-red-400",
      )}
    >
      {direction === "up" ? (
        <TrendingUp size={24} strokeWidth={1.5} absoluteStrokeWidth />
      ) : (
        <TrendingDown size={24} strokeWidth={1.5} absoluteStrokeWidth />
      )}
      <div>
        {Math.round(percentage)}%&nbsp;
        <span className="text-gray-500 dark:text-gray-400">
          than last month
        </span>
      </div>
    </div>
  );
};
