import { type Decorator } from "@storybook/react";
import { ProjectFiltersProvider } from "@/components/projects/ProjectFiltersContext";
import { CreateProjectModalProvider } from "@/components/projects/CreateProjectModal";
import { MockedCreateProjectProvider } from "@/components/projects/CreateProjectProvider/__stories__";
import { MockedDeleteProjectsProvider } from "@/components/projects/DeleteProjectsProvider/__stories__";
import { MockedSelectedProjectsProvider } from "@/components/projects/SelectedProjectsContext/__stories__";
import { CreateProjectCategoryModalProvider } from "@/components/projectCategory/CreateProjectCategoryModal";
import { MockedUpdateProjectStatusesProvider } from "@/components/projects/UpdateProjectStatusesProvider/__stories__";
import { MockedCreateProjectCategoryProvider } from "@/components/projectCategory/CreateProjectCategoryProvider/__stories__";

export const ProjectsPageDecorator: Decorator = (Story) => {
  return (
    <MockedSelectedProjectsProvider>
      <MockedUpdateProjectStatusesProvider>
        <MockedDeleteProjectsProvider>
          <CreateProjectModalProvider>
            <MockedCreateProjectProvider>
              <CreateProjectCategoryModalProvider>
                <MockedCreateProjectCategoryProvider>
                  <ProjectFiltersProvider filters={{}}>
                    <Story />
                  </ProjectFiltersProvider>
                </MockedCreateProjectCategoryProvider>
              </CreateProjectCategoryModalProvider>
            </MockedCreateProjectProvider>
          </CreateProjectModalProvider>
        </MockedDeleteProjectsProvider>
      </MockedUpdateProjectStatusesProvider>
    </MockedSelectedProjectsProvider>
  );
};
