import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { TotalTasksCard } from "./TotalTasksCard";

const getTotalTasks = cache(async (workspaceId: number) => {
  return prisma.task.count({
    where: {
      creator: {
        position: {
          workspaceId,
        },
      },
    },
  });
});

export const TotalTasksCardContainer = async () => {
  const totalTasks = await getTotalTasks(1);

  return <TotalTasksCard totalTasks={totalTasks} />;
};
