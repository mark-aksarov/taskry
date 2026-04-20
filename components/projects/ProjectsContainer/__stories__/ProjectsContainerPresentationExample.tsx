import {
  ProjectGridItemMobile,
  ProjectGridItemLarge,
} from "../../ProjectGridItem";

import { mockedProjectList } from "@/mocks/projects";
import { ProjectListItem } from "../../ProjectListItem";
import { MockedDeleteProjectProvider } from "../../DeleteProjectProvider/__stories__";
import { MockedUpdateProjectProvider } from "../../UpdateProjectProvider/__stories__";
import { EntityContainerPresentation } from "@/components/common/EntityContainerPresentation";
import { MockedUpdateProjectStatusProvider } from "../../UpdateProjectStatusProvider/__stories__";

export function ProjectsContainerPresentationExample() {
  return (
    <EntityContainerPresentation page={1} pageSize={10} totalPages={3}>
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
    </EntityContainerPresentation>
  );
}
