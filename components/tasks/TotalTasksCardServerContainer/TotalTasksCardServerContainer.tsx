import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { TotalTasksCard } from "../TotalTasksCard";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";

const getTotalTasks = cache(async (workspaceId: number) => {
  return prisma.task.count({
    where: {
      category: {
        workspaceId,
      },
    },
  });
});

export const TotalTasksCardServerContainer = async () => {
  const workspaceId = await getUserWorkspaceId();
  const totalTasks = await getTotalTasks(workspaceId);

  return <TotalTasksCard totalTasks={totalTasks} />;
};
