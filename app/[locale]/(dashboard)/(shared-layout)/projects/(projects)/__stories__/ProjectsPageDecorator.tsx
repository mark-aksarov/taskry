import { type Decorator } from "@storybook/react";
import { ProjectFiltersProvider } from "@/components/projects/ProjectFiltersContext";
import { CreateProjectModalProvider } from "@/components/projects/CreateProjectModal";
import { MockedSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { MockedCreateProjectProvider } from "@/components/projects/CreateProjectProvider/__stories__";
import { MockedDeleteProjectsProvider } from "@/components/projects/DeleteProjectsProvider/__stories__";
import { CreateProjectCategoryModalProvider } from "@/components/projectCategory/CreateProjectCategoryModal";
import { MockedUpdateProjectStatusesProvider } from "@/components/projects/UpdateProjectStatusesProvider/__stories__";
import { MockedCreateProjectCategoryProvider } from "@/components/projectCategory/CreateProjectCategoryProvider/__stories__";

export const ProjectsPageDecorator: Decorator = (Story) => {
  return (
    <MockedSelectedItemsProvider>
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
    </MockedSelectedItemsProvider>
  );
};
