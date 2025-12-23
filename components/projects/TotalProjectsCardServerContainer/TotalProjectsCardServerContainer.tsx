import "server-only";

import { TotalProjectsCard } from "../TotalProjectsCard";
import { getProjectCount } from "@/lib/data/project/project.dal";

export const TotalProjectsCardServerContainer = async () => {
  const totalProjects = await getProjectCount();

  return <TotalProjectsCard totalProjects={totalProjects} />;
};
