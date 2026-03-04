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
import { UpdateProjectProvider } from "../UpdateProjectContext";
import { DeleteProjectProvider } from "../DeleteProjectContext";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { SelectableItem } from "@/components/common/SelectableItem";
import { ProjectGridItem } from "../ProjectGridItem/ProjectGridItem";
import { ProjectItemPendingOverlay } from "./ProjectItemPendingOverlay";
import { UpdateProjectStatusProvider } from "../UpdateProjectStatusContext";

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
  const selected = useSelectedProjects();
  const { viewMode } = useViewMode();

  return (
    <UpdateProjectProvider updateProject={updateProject}>
      <DeleteProjectProvider deleteProject={deleteProject}>
        <UpdateProjectStatusProvider updateProjectStatus={updateProjectStatus}>
          <ProjectItemPendingOverlay projectId={props.id}>
            <SelectableItem
              {...selected}
              item={{ id: props.id, status: props.status }}
            >
              {viewMode === "grid" ? (
                <ProjectGridItem {...props} />
              ) : (
                <ProjectListItem {...props} />
              )}
            </SelectableItem>
          </ProjectItemPendingOverlay>
        </UpdateProjectStatusProvider>
      </DeleteProjectProvider>
    </UpdateProjectProvider>
  );
};
