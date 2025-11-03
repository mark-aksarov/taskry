import { Skeleton } from "@/components/ui";
import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardText,
  DashboardCardValue,
} from "../DashboardCard";
import { getTotalUsers } from "@/lib/queries/user";
import { IconlyUser } from "@/components/icons/IconlyUser";

export const TotalUsersCard = async () => {
  const totalUsers = getTotalUsers();

  return (
    <DashboardCard
      text={<DashboardCardText>Total Users</DashboardCardText>}
      icon={
        <DashboardCardIcon color="red">
          <IconlyUser size={24} />
        </DashboardCardIcon>
      }
      value={<DashboardCardValue>{totalUsers}</DashboardCardValue>}
    />
  );
};

export const TotalUsersCardSkeleton = () => (
  <DashboardCard
    text={<DashboardCardText>Total Users</DashboardCardText>}
    icon={
      <DashboardCardIcon color="red">
        <IconlyUser size={24} />
      </DashboardCardIcon>
    }
    value={<Skeleton className="w-[3rem]" size="xl" />}
  />
);
