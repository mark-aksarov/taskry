import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { TaskStatusSelect } from "./TaskStatusSelect";

export const getTaskStatuses = cache(async () => {
  return prisma.taskStatus.findMany({
    select: { id: true, nameEn: true },
  });
});

export async function TaskStatusSelectContainer() {
  const statuses = await getTaskStatuses();

  if (!statuses.length) {
    return null;
  }

  return (
    <TaskStatusSelect
      statuses={statuses.map((s) => ({ id: s.id, name: s.nameEn }))}
    />
  );
}
