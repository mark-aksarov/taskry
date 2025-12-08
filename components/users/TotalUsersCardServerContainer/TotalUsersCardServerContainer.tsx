import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { TotalUsersCard } from "../TotalUsersCard";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";

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
  const workspaceId = await getUserWorkspaceId();
  const totalUsers = await getTotalUsers(workspaceId);

  return <TotalUsersCard totalUsers={totalUsers} />;
};
