import { Skeleton } from "@/components/ui";
import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardText,
  DashboardCardValue,
} from "../DashboardCard";
import { IconlyUser3 } from "@/components/icons/IconlyUser3";

export const TotalCustomersCard = ({
  totalCustomers,
}: {
  totalCustomers?: number;
}) => {
  return (
    <DashboardCard
      text={<DashboardCardText>Total Customers</DashboardCardText>}
      icon={
        <DashboardCardIcon color="green">
          <IconlyUser3 size={24} />
        </DashboardCardIcon>
      }
      value={
        totalCustomers === undefined ? (
          <Skeleton className="w-[3rem]" size="xl" />
        ) : (
          <DashboardCardValue>{totalCustomers}</DashboardCardValue>
        )
      }
    />
  );
};
