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
import { createProject } from "@/lib/actions/project/createProject";
import { deleteProjects } from "@/lib/actions/project/deleteProjects";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";
import { ProjectsContainer } from "@/components/projects/ProjectsContainer";
import { CreateProjectProvider } from "@/components/projects/CreateProjectContext";
import { updateProjectStatuses } from "@/lib/actions/project/updateProjectStatuses";
import { DeleteProjectsProvider } from "@/components/projects/DeleteProjectsContext";
import { ProjectFiltersProvider } from "@/components/projects/ProjectFiltersContext";
import { NewProjectFormContainer } from "@/components/projects/NewProjectFormContainer";
import { SelectedProjectsProvider } from "@/components/projects/SelectedProjectsContext";
import { createProjectCategory } from "@/lib/actions/projectCategory/createProjectCategory";
import { ProjectFiltersFormContainer } from "@/components/projects/ProjectFiltersFormContainer";
import { ProjectRouterSearchContainer } from "@/components/projects/ProjectRouterSearchContainer";
import { UpdateProjectStatusesProvider } from "@/components/projects/UpdateProjectStatusesContext";
import { CreateProjectCategoryProvider } from "@/components/projectCategory/CreateProjectCategoryContext";
import { ProjectCategoryFiltersFormContainer } from "@/components/projects/ProjectCategoryFiltersFormContainer";
import { ProjectCreatorFiltersFormContainer } from "@/components/projects/ProjectCreatorFiltersFormContainer";

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
    <UpdateProjectStatusesProvider
      updateProjectStatuses={updateProjectStatuses}
    >
      <SelectedProjectsProvider
        pageItems={projects.map((p) => ({ id: p.id, status: p.status }))}
      >
        <DeleteProjectsProvider deleteProjects={deleteProjects}>
          <CreateProjectCategoryProvider
            createProjectCategory={createProjectCategory}
          >
            <CreateProjectProvider createProject={createProject}>
              <ProjectFiltersProvider filters={filters}>
                <ProjectsPage
                  totalCount={totalCount}
                  searchContainer={<ProjectRouterSearchContainer />}
                  newProjectFormContainer={<NewProjectFormContainer />}
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
                  projectFiltersFormContainer={<ProjectFiltersFormContainer />}
                  projectCategoryFiltersFormContainer={
                    <ProjectCategoryFiltersFormContainer />
                  }
                  creatorFiltersFormContainer={
                    <ProjectCreatorFiltersFormContainer />
                  }
                  customerFiltersFormContainer={
                    <ProjectCreatorFiltersFormContainer />
                  }
                />
              </ProjectFiltersProvider>
            </CreateProjectProvider>
          </CreateProjectCategoryProvider>
        </DeleteProjectsProvider>
      </SelectedProjectsProvider>
    </UpdateProjectStatusesProvider>
  );
}
