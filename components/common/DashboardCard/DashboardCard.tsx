import { Card } from "@/components/common/Card";

interface DashboardCardProps {
  icon?: React.ReactNode;
  value?: React.ReactNode;
  text?: React.ReactNode;
}

export const DashboardCard = ({ icon, value, text }: DashboardCardProps) => {
  return (
    <Card data-test="dashboard-card" className="p-6">
      <div className="flex items-center gap-6">
        {icon}
        <div className="flex flex-col gap-1.5">
          {value}
          {text}
        </div>
      </div>
    </Card>
  );
};
