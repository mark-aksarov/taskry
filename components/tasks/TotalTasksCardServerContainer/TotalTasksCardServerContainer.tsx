import "server-only";

import { TotalTasksCard } from "../TotalTasksCard";
import { getTaskCount } from "@/lib/data/task/task.dal";

export const TotalTasksCardServerContainer = async () => {
  const totalTasks = await getTaskCount();

  return <TotalTasksCard totalTasks={totalTasks} />;
};
