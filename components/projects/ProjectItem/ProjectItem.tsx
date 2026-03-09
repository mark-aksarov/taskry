"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectPayload,
  UpdateProjectStatusPayload,
} from "@/lib/actions/types";

import { ProjectListItem } from "../ProjectListItem";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useViewMode } from "@/components/common/ViewMode";
import { ProjectItemProviders } from "./ProjectItemProviders";
import { ProjectGridItem } from "../ProjectGridItem/ProjectGridItem";

export interface ProjectItemProps {
  id: number;
  title: string;
  deadline: string;
  creator?: {
    id: string;
    fullName: string;
    imageUrl?: string;
  };
  customer?: {
    id: number;
    fullName: string;
    imageUrl?: string;
  };
  category?: {
    id: number;
    name: string;
  };
  company?: {
    id: number;
    name: string;
  };
  commentsCount: number;
  status: ProjectStatus;
  tasksTotal: number;
  tasksCompleted: number;
  editProjectFormContainer: React.ReactNode;
  customerDetailContainer?: React.ReactNode;
  projectCommentsContainer: React.ReactNode;
  projectDetailContainer: React.ReactNode;
  userDetailContainer?: React.ReactNode;
  sendComment: ActionFn<ActionState, FormData>;
  updateComment: ActionFn<ActionState, FormData>;
  updateProject: ActionFn<ActionState, FormData>;
  deleteProject: ActionFn<ActionState, DeleteProjectPayload>;
  updateProjectStatus: ActionFn<ActionState, UpdateProjectStatusPayload>;
}

export const ProjectItem = ({
  updateProject,
  deleteProject,
  updateProjectStatus,
  ...props
}: ProjectItemProps) => {
  const { viewMode } = useViewMode();

  return (
    <ProjectItemProviders
      projectId={props.id}
      projectStatus={props.status}
      updateProject={updateProject}
      deleteProject={deleteProject}
      updateProjectStatus={updateProjectStatus}
    >
      {viewMode === "grid" ? (
        <ProjectGridItem {...props} />
      ) : (
        <ProjectListItem {...props} />
      )}
    </ProjectItemProviders>
  );
};
