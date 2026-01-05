import "server-only";

import { TotalProjectsCard } from "../TotalProjectsCard";
import { getProjectCount } from "@/lib/data/project/project.dal";

export const TotalProjectsCardContainer = async () => {
  const totalProjects = await getProjectCount();

  return <TotalProjectsCard totalProjects={totalProjects} />;
};
