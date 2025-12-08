import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { TotalProjectsCard } from "../TotalProjectsCard";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";

const getTotalProjects = cache(async (workspaceId: number) => {
  return await prisma.project.count({
    where: {
      category: {
        workspaceId,
      },
    },
  });
});

export const TotalProjectsCardServerContainer = async () => {
  const workspaceId = await getUserWorkspaceId();
  const totalProjects = await getTotalProjects(workspaceId);

  return <TotalProjectsCard totalProjects={totalProjects} />;
};
