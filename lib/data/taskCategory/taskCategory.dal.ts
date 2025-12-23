import { cache } from "react";
import prisma from "@/lib/prisma";
import { getSessionOrThrow } from "@/lib/data/utils/getSessionOrThrow";
import { mapTaskCategorySummaryToDTO } from "./taskCategory.mapper";

export const getTaskCategorySummaries = cache(async () => {
  const {
    user: { workspaceId },
  } = await getSessionOrThrow();

  const categories = await prisma.taskCategory.findMany({
    where: { workspaceId },
    select: { id: true, name: true },
  });

  return categories.map(mapTaskCategorySummaryToDTO);
});
