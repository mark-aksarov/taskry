"use client";

import useSWR from "swr";
import { GetProjectDetailType } from "@/lib/data/project";
import { ProjectDetailCompact } from "../ProjectDetailCompact";

export function ProjectDetailCompactClientContainer({
  projectId,
}: {
  projectId: number;
}) {
  const { data: project } = useSWR<GetProjectDetailType>(
    `/api/projects/${projectId}`,
    { suspense: true },
  );

  if (!project) return null;

  return (
    <ProjectDetailCompact
      id={project.id}
      title={project.title}
      creator={
        project.creator
          ? {
              id: project.creator.id,
              fullName: project.creator.fullName,
              imageUrl: project.creator.imageUrl ?? undefined,
            }
          : undefined
      }
      deadline={project.deadline}
      description={project.description ?? undefined}
      customer={
        project.customer
          ? {
              id: project.customer.id,
              fullName: project.customer.fullName,
            }
          : undefined
      }
      category={project.category}
      status={project.status}
      attachments={project.attachments}
    />
  );
}
