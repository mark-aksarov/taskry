import {
  SelectedProject,
  SelectedProjectsProvider,
} from "@/components/projects/SelectedProjectsContext";

import { ProjectFilters } from "@/lib/types";
import { CreateProjectProvider } from "@/components/projects/CreateProjectProvider";
import { ProjectFiltersProvider } from "@/components/projects/ProjectFiltersContext";
import { DeleteProjectsProvider } from "@/components/projects/DeleteProjectsProvider";
import { CreateProjectModalProvider } from "@/components/projects/CreateProjectModal";
import { ProjectFiltersModalProvider } from "@/components/projects/ProjectFiltersModal";
import { UpdateProjectStatusesProvider } from "@/components/projects/UpdateProjectStatusesProvider";
import { ProjectCustomerFiltersModalProvider } from "@/components/projects/ProjectCustomerFiltersModal";
import { CreateProjectCategoryProvider } from "@/components/projectCategory/CreateProjectCategoryProvider";
import { CreateProjectCategoryModalProvider } from "@/components/projectCategory/CreateProjectCategoryModal";
import { ProjectCategoryFiltersModalProvider } from "@/components/projects/ProjectCategoryFiltersModal/ProjectCategoryFiltersModalContext";
import { ProjectCreatorFiltersModalProvider } from "@/components/projects/ProjectCreatorFiltersModal/ProjectCreatorFiltersModalContext";

interface ProjectsPageProvidersProps {
  pageItems: SelectedProject[];
  filters: ProjectFilters;
  children: React.ReactNode;
}

export function ProjectsPageProviders({
  pageItems,
  filters,
  children,
}: ProjectsPageProvidersProps) {
  return (
    <SelectedProjectsProvider pageItems={pageItems}>
      <UpdateProjectStatusesProvider>
        <DeleteProjectsProvider>
          <CreateProjectModalProvider>
            <CreateProjectProvider>
              <CreateProjectCategoryModalProvider>
                <CreateProjectCategoryProvider>
                  <ProjectFiltersProvider filters={filters}>
                    <ProjectFiltersModalProvider>
                      <ProjectCustomerFiltersModalProvider>
                        <ProjectCategoryFiltersModalProvider>
                          <ProjectCreatorFiltersModalProvider>
                            {children}
                          </ProjectCreatorFiltersModalProvider>
                        </ProjectCategoryFiltersModalProvider>
                      </ProjectCustomerFiltersModalProvider>
                    </ProjectFiltersModalProvider>
                  </ProjectFiltersProvider>
                </CreateProjectCategoryProvider>
              </CreateProjectCategoryModalProvider>
            </CreateProjectProvider>
          </CreateProjectModalProvider>
        </DeleteProjectsProvider>
      </UpdateProjectStatusesProvider>
    </SelectedProjectsProvider>
  );
}
