import {
  ProjectGridItemMobile,
  ProjectGridItemLarge,
} from "../../ProjectGridItem";

import { mockedProjectList } from "@/mocks/projects";
import { ProjectListItem } from "../../ProjectListItem";
import { useViewMode } from "@/dashboard/common/ViewMode";
import { EntityGrid } from "@/dashboard/common/EntityGrid";
import { DeleteProjectProvider } from "../../DeleteProjectContext";
import { UpdateProjectProvider } from "../../UpdateProjectContext";
import { UpdateProjectStatusProvider } from "../../UpdateProjectStatusContext";

export function ProjectGridExample() {
  const { viewMode } = useViewMode();

  return (
    <EntityGrid viewMode={viewMode}>
      {mockedProjectList.map((project) => (
        <DeleteProjectProvider key={project.id}>
          <UpdateProjectProvider>
            <UpdateProjectStatusProvider>
              <ProjectListItem {...project} />
              <ProjectGridItemMobile {...project} />
              <ProjectGridItemLarge {...project} />
            </UpdateProjectStatusProvider>
          </UpdateProjectProvider>
        </DeleteProjectProvider>
      ))}
    </EntityGrid>
  );
}
