import {
  DashboardCard,
  DashboardCardIcon,
  DashboardCardText,
  DashboardCardValue,
} from "../DashboardCard";
import { Skeleton } from "@/components/ui";
import { IconlyUser } from "@/components/icons/IconlyUser";

export const TotalUsersCard = ({ totalUsers }: { totalUsers?: number }) => {
  return (
    <DashboardCard
      text={<DashboardCardText>Total Users</DashboardCardText>}
      icon={
        <DashboardCardIcon color="red">
          <IconlyUser size={24} />
        </DashboardCardIcon>
      }
      value={
        totalUsers === undefined ? (
          <Skeleton className="w-[3rem]" size="xl" />
        ) : (
          <DashboardCardValue>{totalUsers}</DashboardCardValue>
        )
      }
    />
  );
};
