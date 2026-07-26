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
import { clientId } from "@/lib/schemas/client";
import { projectStatus } from "@/lib/schemas/project";
import { projectCategoryId } from "@/lib/schemas/projectCategory";
import { getClientCount } from "@/lib/data/client/client.dal";
import { CreateProjectModal } from "@/dashboard/projects/CreateProjectModal";
import { ProjectSearchModal } from "@/dashboard/projects/ProjectSearchModal";
import { ProjectFiltersModal } from "@/dashboard/projects/ProjectFiltersModal";
import { DeleteProjectsModal } from "@/dashboard/projects/DeleteProjectsModal";
import { ImportProjectsModal } from "@/dashboard/projects/ImportProjectsModal";
import { ProjectGridContainer } from "@/dashboard/projects/ProjectGridContainer";
import { CreateProjectProvider } from "@/dashboard/projects/CreateProjectProvider";
import { requireFullAccess } from "@/lib/utils/requireFullAccess";
import { ProjectFiltersProvider } from "@/dashboard/projects/ProjectFiltersContext";
import { ImportProjectsProvider } from "@/dashboard/projects/ImportProjectsProvider";
import { DeleteProjectsProvider } from "@/dashboard/projects/DeleteProjectsProvider";
import { SelectedProjectsProvider } from "@/dashboard/projects/SelectedProjectsContext";
import { getProjectCategoryCount } from "@/lib/data/projectCategory/projectCategory.dal";
import { ProjectStatusFiltersModal } from "@/dashboard/projects/ProjectStatusFiltersModal";
import { ProjectClientFiltersModal } from "@/dashboard/projects/ProjectClientFiltersModal";
import { ProjectCreatorFiltersModal } from "@/dashboard/projects/ProjectCreatorFiltersModal";
import { CreateProjectFormContainer } from "@/dashboard/projects/CreateProjectFormContainer";
import { ProjectCategoryFiltersModal } from "@/dashboard/projects/ProjectCategoryFiltersModal";
import { ProjectFiltersFormContainer } from "@/dashboard/projects/ProjectFiltersFormContainer";
import { ProjectRouterSearchContainer } from "@/dashboard/projects/ProjectRouterSearchContainer";
import { UpdateProjectStatusesProvider } from "@/dashboard/projects/UpdateProjectStatusesProvider";
import { CreateProjectCategoryModal } from "@/dashboard/projectCategory/CreateProjectCategoryModal";
import { CreateProjectCategoryProvider } from "@/dashboard/projectCategory/CreateProjectCategoryProvider";
import { ProjectCreatorFiltersFormContainer } from "@/dashboard/projects/ProjectCreatorFiltersFormContainer";
import { ProjectClientFiltersFormContainer } from "@/dashboard/projects/ProjectClientFiltersFormContainer";
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
  clientIds: z.preprocess(
    searchParamToArray,
    z.array(clientId).optional().catch(undefined),
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
  await requireFullAccess();

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

  // Show category filters only when categories exist
  const categoryCount = await getProjectCategoryCount();

  // Show client filters only when clients exist
  const clientCount = await getClientCount();

  return (
    <SelectedProjectsProvider pageItems={projects}>
      <UpdateProjectStatusesProvider>
        <DeleteProjectsProvider>
          <CreateProjectProvider>
            <CreateProjectCategoryProvider>
              <ProjectFiltersProvider filters={filters}>
                <ImportProjectsProvider>
                  <ProjectsPage
                    page={page}
                    pageSize={pageSize}
                    totalCount={totalCount}
                    categoryCount={categoryCount}
                    clientCount={clientCount}
                    totalFilteredProjects={totalFilteredProjects}
                    selectedSortField={sort}
                    projectGrid={<ProjectGridContainer projects={projects} />}
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
                  <ProjectClientFiltersModal
                    filtersFormContainer={<ProjectClientFiltersFormContainer />}
                  />
                  <ProjectCategoryFiltersModal
                    filtersFormContainer={
                      <ProjectCategoryFiltersFormContainer />
                    }
                  />
                  <ProjectCreatorFiltersModal
                    filtersFormContainer={
                      <ProjectCreatorFiltersFormContainer />
                    }
                  />
                  <DeleteProjectsModal />
                  <ProjectStatusFiltersModal />
                  <ImportProjectsModal />
                </ImportProjectsProvider>
              </ProjectFiltersProvider>
            </CreateProjectCategoryProvider>
          </CreateProjectProvider>
        </DeleteProjectsProvider>
      </UpdateProjectStatusesProvider>
    </SelectedProjectsProvider>
  );
}
