"use client";

import dynamic from "next/dynamic";
import { ProjectListSkeleton } from "./ProjectList";
import { ProjectGridMobileSkeleton } from "./ProjectGrid";
import { ProjectListItemDTO } from "@/lib/data/project/project.dto";

const ProjectsDynamic = dynamic(
  () => import("./ProjectsDynamic").then((mod) => mod.ProjectsDynamic),
  {
    ssr: false,
    loading: () => (
      <>
        <ProjectListSkeleton className="max-md:hidden" items={10} />
        <ProjectGridMobileSkeleton className="md:hidden" items={10} />
      </>
    ),
  },
);

export interface ProjectsContainerProps {
  projects: ProjectListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export function ProjectsContainer({
  projects,
  totalCount,
  page,
  pageSize,
}: ProjectsContainerProps) {
  return (
    <ProjectsDynamic
      page={page}
      pageSize={pageSize}
      projects={projects}
      totalPages={Math.ceil(totalCount / pageSize)}
    />
  );
}
