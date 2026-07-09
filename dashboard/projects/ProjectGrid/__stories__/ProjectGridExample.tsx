import {
  ProjectGridItemMobile,
  ProjectGridItemLarge,
} from "../../ProjectGridItem";

import { mockedProjectList } from "@/mocks/projects";
import { ProjectListItem } from "../../ProjectListItem";
import { useViewMode } from "@/dashboard/common/ViewMode";
import { EntityGrid } from "@/dashboard/common/EntityGrid";
import { MockedDeleteProjectProvider } from "../../DeleteProjectProvider/__stories__";
import { MockedUpdateProjectProvider } from "../../UpdateProjectProvider/__stories__";
import { MockedUpdateProjectStatusProvider } from "../../UpdateProjectStatusProvider/__stories__";

export function ProjectGridExample() {
  const { viewMode } = useViewMode();

  return (
    <EntityGrid viewMode={viewMode}>
      {mockedProjectList.map((project) => (
        <MockedDeleteProjectProvider key={project.id}>
          <MockedUpdateProjectProvider>
            <MockedUpdateProjectStatusProvider>
              <ProjectListItem {...project} />
              <ProjectGridItemMobile {...project} />
              <ProjectGridItemLarge {...project} />
            </MockedUpdateProjectStatusProvider>
          </MockedUpdateProjectProvider>
        </MockedDeleteProjectProvider>
      ))}
    </EntityGrid>
  );
}
