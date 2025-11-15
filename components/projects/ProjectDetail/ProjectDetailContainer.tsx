"use client";

import useSWR from "swr";
import { ProjectDetail } from "./ProjectDetail";
import { GetProjectDetailType } from "@/lib/queries/project";
import { ProjectDetailSkeleton } from "./ProjectDetailSkeleton";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ProjectDetailContainer({ projectId }: { projectId: number }) {
  const {
    data: project,
    error,
    isLoading,
  } = useSWR<GetProjectDetailType>(`/api/projects/${projectId}`, fetcher);

  if (isLoading) {
    return <ProjectDetailSkeleton />;
  }

  if (!project) return null;

  return (
    <ProjectDetail
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
      status={{
        id: project.status.id,
        name: project.status.nameEn,
      }}
      attachments={project.attachments}
    />
  );
}
