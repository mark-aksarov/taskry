import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { TaskStatusCheckboxGroup } from "./TaskStatusCheckboxGroup";

export const getTaskStatuses = cache(async () => {
  return prisma.taskStatus.findMany({
    select: { id: true, nameEn: true },
  });
});

export async function TaskStatusCheckboxGroupContainer() {
  const statuses = await getTaskStatuses();

  if (!statuses.length) {
    return null;
  }

  return (
    <TaskStatusCheckboxGroup
      statuses={statuses.map((s) => ({ id: s.id, name: s.nameEn }))}
    />
  );
}
