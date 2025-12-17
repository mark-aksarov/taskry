import "server-only";

import { getProjectCount } from "@/lib/dal/project";
import { TotalProjectsCard } from "../TotalProjectsCard";

export const TotalProjectsCardServerContainer = async () => {
  const totalProjects = await getProjectCount();

  return <TotalProjectsCard totalProjects={totalProjects} />;
};
