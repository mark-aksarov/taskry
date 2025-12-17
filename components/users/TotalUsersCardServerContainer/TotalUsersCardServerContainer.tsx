import "server-only";

import { getUserCount } from "@/lib/dal/user";
import { TotalUsersCard } from "../TotalUsersCard";

export const TotalUsersCardServerContainer = async () => {
  const totalUsers = await getUserCount();

  return <TotalUsersCard totalUsers={totalUsers} />;
};
