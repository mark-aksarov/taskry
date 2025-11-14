import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { TotalProjectsCard } from "./TotalProjectsCard";

const getTotalProjects = cache(async (workspaceId: number) => {
  return await prisma.project.count({
    where: {
      creator: {
        position: {
          workspaceId,
        },
      },
    },
  });
});

export const TotalProjectsCardContainer = async () => {
  const totalProjects = await getTotalProjects(1);

  return <TotalProjectsCard totalProjects={totalProjects} />;
};
