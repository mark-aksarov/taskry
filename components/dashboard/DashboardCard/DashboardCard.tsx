import { twMerge } from "tailwind-merge";
import { Card } from "@/components/common/Card";

interface DashboardCardProps {
  heading?: React.ReactNode;
  icon?: React.ReactNode;
  value?: React.ReactNode;
  stat?: React.ReactNode;
  progress?: React.ReactNode;
  className?: string;
}

export const DashboardCard = ({
  heading,
  icon,
  value,
  stat,
  progress,
  className,
}: DashboardCardProps) => {
  return (
    <Card className={twMerge(className, "h-[10rem]")}>
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-4">
            {heading}
            {value}
          </div>
          {icon}
        </div>
        {stat}
        {progress}
      </div>
    </Card>
  );
};
