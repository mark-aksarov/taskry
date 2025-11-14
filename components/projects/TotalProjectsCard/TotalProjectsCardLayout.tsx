import {
  DashboardCard,
  DashboardCardIcon,
} from "@/components/common/DashboardCard";
import { IconlyWork } from "@/components/icons/IconlyWork";
import { DashboardCardText } from "@/components/common/DashboardCard";

export const TotalProjectsCardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DashboardCard
      text={<DashboardCardText>Total Projects</DashboardCardText>}
      icon={
        <DashboardCardIcon color="blue">
          <IconlyWork size={24} />
        </DashboardCardIcon>
      }
      value={children}
    />
  );
};
