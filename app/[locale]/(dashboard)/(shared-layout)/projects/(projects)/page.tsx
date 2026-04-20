import {
  pageSearchParam,
  dateSearchParam,
  booleanSearchParam,
  searchParamToArray,
  pageSizeSearchParam,
  searchQueryParam,
} from "@/lib/schemas/base";

import {
  getProjectCount,
  getProjectList,
} from "@/lib/data/project/project.dal";

import { z } from "zod";
import { userId } from "@/lib/schemas/user";
import { ProjectsPage } from "./ProjectsPage";
import { projectSortFields } from "@/lib/types";
import { customerId } from "@/lib/schemas/customer";
import { projectStatus } from "@/lib/schemas/project";
import { projectCategoryId } from "@/lib/schemas/projectCategory";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ProjectsContainer } from "@/dashboard/projects/ProjectsContainer";
import { CreateProjectModal } from "@/dashboard/projects/CreateProjectModal";
import { ProjectSearchModal } from "@/dashboard/projects/ProjectSearchModal";
import { ProjectFiltersModal } from "@/dashboard/projects/ProjectFiltersModal";
import { DeleteProjectsModal } from "@/dashboard/projects/DeleteProjectsModal";
import { CreateProjectProvider } from "@/dashboard/projects/CreateProjectProvider";
import { ProjectFiltersProvider } from "@/dashboard/projects/ProjectFiltersContext";
import { DeleteProjectsProvider } from "@/dashboard/projects/DeleteProjectsProvider";
import { SelectedProjectsProvider } from "@/dashboard/projects/SelectedProjectsContext";
import { ProjectStatusFiltersModal } from "@/dashboard/projects/ProjectStatusFiltersModal";
import { ProjectCreatorFiltersModal } from "@/dashboard/projects/ProjectCreatorFiltersModal";
import { CreateProjectFormContainer } from "@/dashboard/projects/CreateProjectFormContainer";
import { ProjectCategoryFiltersModal } from "@/dashboard/projects/ProjectCategoryFiltersModal";
import { ProjectCustomerFiltersModal } from "@/dashboard/projects/ProjectCustomerFiltersModal";
import { ProjectFiltersFormContainer } from "@/dashboard/projects/ProjectFiltersFormContainer";
import { ProjectRouterSearchContainer } from "@/dashboard/projects/ProjectRouterSearchContainer";
import { UpdateProjectStatusesProvider } from "@/dashboard/projects/UpdateProjectStatusesProvider";
import { CreateProjectCategoryModal } from "@/dashboard/projectCategory/CreateProjectCategoryModal";
import { CreateProjectCategoryProvider } from "@/dashboard/projectCategory/CreateProjectCategoryProvider";
import { ProjectCreatorFiltersFormContainer } from "@/dashboard/projects/ProjectCreatorFiltersFormContainer";
import { ProjectCustomerFiltersFormContainer } from "@/dashboard/projects/ProjectCustomerFiltersFormContainer";
import { ProjectCategoryFiltersFormContainer } from "@/dashboard/projects/ProjectCategoryFiltersFormContainer";

const searchParamsSchema = z.object({
  query: searchQueryParam,
  page: pageSearchParam,
  pageSize: pageSizeSearchParam,
  deadlineFrom: dateSearchParam,
  deadlineTo: dateSearchParam,
  noActiveTasks: booleanSearchParam,
  sort: z.enum(projectSortFields).catch("createdAt"),
  statuses: z.preprocess(
    searchParamToArray,
    z.array(projectStatus).optional().catch(undefined),
  ),
  categoryIds: z.preprocess(
    searchParamToArray,
    z.array(projectCategoryId).optional().catch(undefined),
  ),
  customerIds: z.preprocess(
    searchParamToArray,
    z.array(customerId).optional().catch(undefined),
  ),
  creatorIds: z.preprocess(
    searchParamToArray,
    z.array(userId).optional().catch(undefined),
  ),
});

export default async function AppProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // Authorization
  await requireProtectedPage();

  // Validation
  const rawParams = await searchParams;
  const validated = searchParamsSchema.parse(rawParams);
  const { page, pageSize, sort, ...filters } = validated;

  // Render the empty page if there are no projects
  const totalCount = await getProjectCount();

  // Get projects for the current page based on filters and sorting
  const { items: projects, totalCount: totalFilteredProjects } =
    await getProjectList({
      page,
      pageSize,
      sort,
      filters,
    });

  return (
    <SelectedProjectsProvider pageItems={projects}>
      <UpdateProjectStatusesProvider>
        <DeleteProjectsProvider>
          <CreateProjectProvider>
            <CreateProjectCategoryProvider>
              <ProjectFiltersProvider filters={filters}>
                <ProjectsPage
                  totalCount={totalCount}
                  totalFilteredProjects={totalFilteredProjects}
                  selectedSortField={sort}
                  projectsContainer={
                    <ProjectsContainer
                      projects={projects}
                      totalCount={totalFilteredProjects}
                      page={page}
                      pageSize={pageSize}
                    />
                  }
                />

                <ProjectSearchModal
                  searchContainer={<ProjectRouterSearchContainer />}
                />
                <CreateProjectModal
                  createProjectFormContainer={<CreateProjectFormContainer />}
                />
                <CreateProjectCategoryModal />
                <ProjectFiltersModal
                  filtersFormContainer={<ProjectFiltersFormContainer />}
                />
                <ProjectCustomerFiltersModal
                  filtersFormContainer={<ProjectCustomerFiltersFormContainer />}
                />
                <ProjectCategoryFiltersModal
                  filtersFormContainer={<ProjectCategoryFiltersFormContainer />}
                />
                <ProjectCreatorFiltersModal
                  filtersFormContainer={<ProjectCreatorFiltersFormContainer />}
                />
                <DeleteProjectsModal />
                <ProjectStatusFiltersModal />
              </ProjectFiltersProvider>
            </CreateProjectCategoryProvider>
          </CreateProjectProvider>
        </DeleteProjectsProvider>
      </UpdateProjectStatusesProvider>
    </SelectedProjectsProvider>
  );
}
