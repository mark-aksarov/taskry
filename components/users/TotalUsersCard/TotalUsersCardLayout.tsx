import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardText,
} from "@/components/common/DashboardCard";
import { IconlyUser } from "@/components/icons/IconlyUser";

export const TotalUsersCardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DashboardCard
      text={<DashboardCardText>Total Users</DashboardCardText>}
      icon={
        <DashboardCardIcon color="red">
          <IconlyUser size={24} />
        </DashboardCardIcon>
      }
      value={children}
    />
  );
};
