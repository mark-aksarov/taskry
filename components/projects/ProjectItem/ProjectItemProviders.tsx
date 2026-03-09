import {
  ActionFn,
  ActionState,
  DeleteProjectPayload,
  UpdateProjectStatusPayload,
} from "@/lib/actions/types";

import { ProjectStatus } from "@/generated/prisma/enums";
import { UpdateProjectProvider } from "../UpdateProjectContext";
import { DeleteProjectProvider } from "../DeleteProjectContext";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { SelectableItem } from "@/components/common/SelectableItem";
import { ProjectItemPendingOverlay } from "./ProjectItemPendingOverlay";
import { UpdateProjectStatusProvider } from "../UpdateProjectStatusContext";

interface ProjectItemProvidersProps {
  projectId: number;
  projectStatus: ProjectStatus;
  updateProject: ActionFn<ActionState, FormData>;
  deleteProject: ActionFn<ActionState, DeleteProjectPayload>;
  updateProjectStatus: ActionFn<ActionState, UpdateProjectStatusPayload>;
  children: React.ReactNode;
}

export function ProjectItemProviders({
  projectId,
  projectStatus,
  updateProject,
  deleteProject,
  updateProjectStatus,
  children,
}: ProjectItemProvidersProps) {
  const selected = useSelectedProjects();

  return (
    <UpdateProjectProvider updateProject={updateProject}>
      <DeleteProjectProvider deleteProject={deleteProject}>
        <UpdateProjectStatusProvider updateProjectStatus={updateProjectStatus}>
          <ProjectItemPendingOverlay projectId={projectId}>
            <SelectableItem
              {...selected}
              item={{ id: projectId, status: projectStatus }}
            >
              {children}
            </SelectableItem>
          </ProjectItemPendingOverlay>
        </UpdateProjectStatusProvider>
      </DeleteProjectProvider>
    </UpdateProjectProvider>
  );
}
