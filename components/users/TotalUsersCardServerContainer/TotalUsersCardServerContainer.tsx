import "server-only";

import { getUserCount } from "@/lib/data/user";
import { TotalUsersCard } from "../TotalUsersCard";

export const TotalUsersCardServerContainer = async () => {
  const totalUsers = await getUserCount();

  return <TotalUsersCard totalUsers={totalUsers} />;
};
