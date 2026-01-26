import "server-only";

import {
  TotalProjectsCard,
  TotalProjectsCardSkeleton,
} from "../TotalProjectsCard";
import { Suspense } from "react";
import { getProjectCount } from "@/lib/data/project/project.dal";

export const TotalProjectsCardContainer = () => {
  return (
    <Suspense fallback={<TotalProjectsCardSkeleton />}>
      <TotalProjectsCardContainerInner />
    </Suspense>
  );
};

const TotalProjectsCardContainerInner = async () => {
  const totalProjects = await getProjectCount();

  return <TotalProjectsCard totalProjects={totalProjects} />;
};
