"use client";

import {
  ActionFn,
  ActionState,
  DeleteProjectsPayload,
  UpdateProjectStatusesPayload,
} from "@/lib/actions/types";

import { ProjectListItem } from "../ProjectListItem";
import { ProjectStatus } from "@/generated/prisma/enums";
import { useViewMode } from "@/components/common/ViewMode";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { SelectableItem } from "@/components/common/SelectableItem";
import { ProjectGridItem } from "../ProjectGridItem/ProjectGridItem";
import { ProjectItemPendingOverlay } from "./ProjectItemPendingOverlay";
import { UpdateProjectTransitionProvider } from "../UpdateProjectTransitionContext";
import { DeleteProjectTransitionProvider } from "../DeleteProjectTransitionContext";
import { UpdateProjectStatusTransitionProvider } from "../UpdateProjectStatusTransitionContext";

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
  updateProjectStatus: ActionFn<ActionState, UpdateProjectStatusesPayload>;
  deleteProject: ActionFn<ActionState, DeleteProjectsPayload>;
}

export const ProjectItem = (props: ProjectItemProps) => {
  const selected = useSelectedProjects();
  const { viewMode } = useViewMode();

  return (
    <UpdateProjectTransitionProvider>
      <DeleteProjectTransitionProvider>
        <UpdateProjectStatusTransitionProvider>
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
        </UpdateProjectStatusTransitionProvider>
      </DeleteProjectTransitionProvider>
    </UpdateProjectTransitionProvider>
  );
};
