import { Skeleton } from "@/components/ui";
import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardText,
  DashboardCardValue,
} from "../DashboardCard";
import { IconlyUser3 } from "@/components/icons/IconlyUser3";
import { getTotalCustomers } from "@/lib/queries/customers";

export const TotalCustomersCard = async () => {
  const totalCustomers = getTotalCustomers();

  return (
    <DashboardCard
      text={<DashboardCardText>Total Customers</DashboardCardText>}
      icon={
        <DashboardCardIcon color="green">
          <IconlyUser3 size={24} />
        </DashboardCardIcon>
      }
      value={<DashboardCardValue>{totalCustomers}</DashboardCardValue>}
    />
  );
};

export const TotalCustomersCardSkeleton = () => (
  <DashboardCard
    text={<DashboardCardText>Total Customers</DashboardCardText>}
    icon={
      <DashboardCardIcon color="green">
        <IconlyUser3 size={24} />
      </DashboardCardIcon>
    }
    value={<Skeleton className="w-[3rem]" size="xl" />}
  />
);
