import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardText,
} from "@/components/common/DashboardCard";
import { IconlyUser3 } from "@/components/icons/IconlyUser3";

export const TotalCustomersCardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DashboardCard
      text={<DashboardCardText>Total Customers</DashboardCardText>}
      icon={
        <DashboardCardIcon color="green">
          <IconlyUser3 size={24} />
        </DashboardCardIcon>
      }
      value={children}
    />
  );
};
