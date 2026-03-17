import {
  ActionFn,
  ActionState,
  DeleteProjectPayload,
  UpdateProjectStatusPayload,
} from "@/lib/actions/types";

import { UpdateProjectProvider } from "../UpdateProjectContext";
import { DeleteProjectProvider } from "../DeleteProjectContext";
import { ProjectItemPendingOverlay } from "./ProjectItemPendingOverlay";
import { UpdateProjectStatusProvider } from "../UpdateProjectStatusContext";

interface ProjectItemProvidersProps {
  projectId: number;
  updateProject: ActionFn<ActionState, FormData>;
  deleteProject: ActionFn<ActionState, DeleteProjectPayload>;
  updateProjectStatus: ActionFn<ActionState, UpdateProjectStatusPayload>;
  children: React.ReactNode;
}

export function ProjectItemProviders({
  projectId,
  updateProject,
  deleteProject,
  updateProjectStatus,
  children,
}: ProjectItemProvidersProps) {
  return (
    <UpdateProjectProvider updateProject={updateProject}>
      <DeleteProjectProvider deleteProject={deleteProject}>
        <UpdateProjectStatusProvider updateProjectStatus={updateProjectStatus}>
          <ProjectItemPendingOverlay projectId={projectId}>
            {children}
          </ProjectItemPendingOverlay>
        </UpdateProjectStatusProvider>
      </DeleteProjectProvider>
    </UpdateProjectProvider>
  );
}
