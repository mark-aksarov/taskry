import "server-only";

import { TotalUsersCard } from "../TotalUsersCard";
import { getUserCount } from "@/lib/data/user/user.dal";

export const TotalUsersCardServerContainer = async () => {
  const totalUsers = await getUserCount();

  return <TotalUsersCard totalUsers={totalUsers} />;
};
