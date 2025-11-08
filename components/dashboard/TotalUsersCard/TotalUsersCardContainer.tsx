import { getTotalUsers } from "@/lib/queries/user";
import { TotalUsersCard } from "./TotalUsersCard";

export const TotalUsersCardContainer = async () => {
  const totalUsers = await getTotalUsers();

  return <TotalUsersCard totalUsers={totalUsers} />;
};
