import { type Decorator } from "@storybook/react";
import { ProjectFiltersProvider } from "@/components/projects/ProjectFiltersContext";
import { CreateProjectModalProvider } from "@/components/projects/CreateProjectModal";
import { ProjectFiltersModalProvider } from "@/components/projects/ProjectFiltersModal";
import { MockedCreateProjectProvider } from "@/components/projects/CreateProjectProvider/__stories__";
import { ProjectCustomerFiltersModalProvider } from "@/components/projects/ProjectCustomerFiltersModal";
import { MockedDeleteProjectsProvider } from "@/components/projects/DeleteProjectsProvider/__stories__";
import { MockedSelectedProjectsProvider } from "@/components/projects/SelectedProjectsContext/__stories__";
import { CreateProjectCategoryModalProvider } from "@/components/projectCategory/CreateProjectCategoryModal";
import { MockedUpdateProjectStatusesProvider } from "@/components/projects/UpdateProjectStatusesProvider/__stories__";
import { MockedCreateProjectCategoryProvider } from "@/components/projectCategory/CreateProjectCategoryProvider/__stories__";
import { ProjectCreatorFiltersModalProvider } from "@/components/projects/ProjectCreatorFiltersModal/ProjectCreatorFiltersModalContext";
import { ProjectCategoryFiltersModalProvider } from "@/components/projects/ProjectCategoryFiltersModal/ProjectCategoryFiltersModalContext";

export const withProjectsPageProviders: Decorator = (Story) => {
  return (
    <MockedSelectedProjectsProvider>
      <MockedUpdateProjectStatusesProvider>
        <MockedDeleteProjectsProvider>
          <CreateProjectModalProvider>
            <MockedCreateProjectProvider>
              <CreateProjectCategoryModalProvider>
                <MockedCreateProjectCategoryProvider>
                  <ProjectFiltersProvider filters={{}}>
                    <ProjectFiltersModalProvider>
                      <ProjectCustomerFiltersModalProvider>
                        <ProjectCategoryFiltersModalProvider>
                          <ProjectCreatorFiltersModalProvider>
                            <Story />
                          </ProjectCreatorFiltersModalProvider>
                        </ProjectCategoryFiltersModalProvider>
                      </ProjectCustomerFiltersModalProvider>
                    </ProjectFiltersModalProvider>
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
