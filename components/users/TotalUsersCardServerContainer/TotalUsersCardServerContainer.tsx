import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { TotalUsersCard } from "../TotalUsersCard";

const getTotalUsers = cache(async (workspaceId: number) => {
  return prisma.user.count({
    where: {
      position: {
        workspaceId,
      },
    },
  });
});

export const TotalUsersCardServerContainer = async () => {
  const totalUsers = await getTotalUsers(1);

  return <TotalUsersCard totalUsers={totalUsers} />;
};
