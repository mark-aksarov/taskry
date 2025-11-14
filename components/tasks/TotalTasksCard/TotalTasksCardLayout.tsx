import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardText,
} from "@/components/common/DashboardCard";
import { IconlyCalendar } from "@/components/icons/IconlyCalendar";

export const TotalTasksCardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DashboardCard
      text={<DashboardCardText>Total Tasks</DashboardCardText>}
      icon={
        <DashboardCardIcon color="orange">
          <IconlyCalendar size={24} />
        </DashboardCardIcon>
      }
      value={children}
    />
  );
};
