import { tv } from "tailwind-variants";
import { Card } from "@/dashboard/common/Card";

const dashboardCardStyles = tv({
  slots: {
    root: "p-6",
    inner: "flex items-center gap-6",
    content: "flex flex-auto flex-col gap-1.5 overflow-hidden",
  },
});

type DashboardCardProps = {
  icon: React.ReactNode;
  value: React.ReactNode;
  text: React.ReactNode;
};

export const DashboardCard = ({ icon, value, text }: DashboardCardProps) => {
  const { root, inner, content } = dashboardCardStyles();

  return (
    <Card data-test="dashboard-card" className={root()}>
      <div className={inner()}>
        {icon}

        <div className={content()}>
          {value}
          {text}
        </div>
      </div>
    </Card>
  );
};
