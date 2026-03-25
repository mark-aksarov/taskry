import {
  SelectedProject,
  SelectedProjectsProvider,
} from "@/components/projects/SelectedProjectsContext";

import { ProjectFilters } from "@/lib/types";
import { CreateProjectProvider } from "@/components/projects/CreateProjectProvider";
import { ProjectFiltersProvider } from "@/components/projects/ProjectFiltersContext";
import { DeleteProjectsProvider } from "@/components/projects/DeleteProjectsProvider";
import { CreateProjectModalProvider } from "@/components/projects/CreateProjectModal";
import { UpdateProjectStatusesProvider } from "@/components/projects/UpdateProjectStatusesProvider";
import { CreateProjectCategoryProvider } from "@/components/projectCategory/CreateProjectCategoryProvider";
import { CreateProjectCategoryModalProvider } from "@/components/projectCategory/CreateProjectCategoryModal";

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
                    {children}
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
